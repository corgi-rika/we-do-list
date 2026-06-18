export type CategoryChipProps = {
  /** カテゴリー名 */
  name: string;
  /** 選択中かどうか */
  selected: boolean;
  /** クリック時のハンドラ */
  onClick: () => void;
};
