import { parseCSV } from '../../utils/csvParser';
import { logger } from '../../utils/logger';
import { type QuizData } from './type/quizType';

export const loadQuizDataList = async (): Promise<QuizData[]> => {
  try {
    // GitHub Pages環境のベースURLに対応するため、相対パスでfetch
    const response = await fetch(`${import.meta.env.BASE_URL}quizzes1.csv`);
    if (!response.ok) {
      throw new Error(`CSVの取得に失敗しました: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rawRows = parseCSV(csvText);

    if (rawRows.length === 0) return [];

    // csvの定義名称の１行目を無視
    const dataRows = rawRows.slice(1);;

    // CSVの列定義（例）:
    //: ID, [1]: 問題文, [2]: 画像ファイル名, [3]: ヒント1, [4]: ヒント2, [5]: ヒント3, [6]: 正解, [7]: 解説
    return dataRows
      .filter(row => row.length >= 7 && row[0].trim() !== '') // 空行の除外
      .map((row) => {
        // ヒントを集約
        const hints = [row[3], row[4], row[5]]
          .map(h => h?.trim())
          .filter(h => h && h !== '');

        // 画像名のパス構成。未記述なら undefined
        const imageName = row[2]?.trim();
        const imagePath = imageName ? `${import.meta.env.BASE_URL}${imageName}` : undefined;

        return {
          id: row[0].trim(),
          questionText: row[1].trim(),
          imagePath: imagePath,
          hints: hints,
          answer: row[6].trim(),
          explanation: row[7].trim(),
        };
      });
  } catch (error) {
    logger.error('問題データのロード中にエラーが発生しました:', error);
    return [];
  }
};
