import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/clipboard";

/**
 * テキストをコピーし、一定時間だけ「コピー済み」表示を出すフック。
 * copied フラグと setTimeout で元に戻す処理をまとめたもの。
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    },
    [resetMs],
  );

  const reset = useCallback(() => setCopied(false), []);

  return { copied, copy, reset };
}
