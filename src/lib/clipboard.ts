// テキストをクリップボードにコピーする。
// navigator.clipboard が使えない環境（HTTP やスマホの一部ブラウザ）では
// execCommand を使ったフォールバックで対応する。
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // フォールバックへ進む
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.contentEditable = "true";
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  // iOS Safari では select() だけでは選択されないため Range で選択する
  const range = document.createRange();
  range.selectNodeContents(textarea);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  textarea.setSelectionRange(0, text.length);

  // execCommand は非推奨だが、clipboard API 非対応環境のフォールバックとして使用
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
