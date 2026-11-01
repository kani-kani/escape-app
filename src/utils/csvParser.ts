/**
 * シンプルなCSVテキストパース関数
 */
export const parseCSV = (text: string): string[][] => {
  const lines: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  // 末尾の改行コードを統一
  const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    const nextChar = normalizedText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // 二重ダブルクォーテーションは1つのダブルクォーテーションに変換
          cell += '"';
          i++;
        } else {
          // クォート終了
          inQuotes = false;
        }
      } else {
        // クォート内の文字（改行やカンマもそのまま保持）
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true; // クォート開始
      } else if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n') {
        row.push(cell);
        lines.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }
  }

  // 最後の未処理のセルを追加
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    lines.push(row);
  }

  return lines;
};
