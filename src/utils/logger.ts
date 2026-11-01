class Logger {
  // GitHub Pages本番環境（production）では info を非表示にする
  private isDevelopment = import.meta.env.MODE === 'development';

  /**
   * 情報ログ
   * 本番環境非表示
   */
  public info(message?: string, ...optionalParams: any[]): void {
    if (!this.isDevelopment) return;
    console.log(
      `%c[INFO] ${new Date().toLocaleTimeString()} - ${message}`,
      'color: #3498db; font-weight: bold;',
      ...optionalParams
    );
  }

  /**
   * 警告ログ
   */
  public warn(message?: string, ...optionalParams: any[]): void {
    console.warn(
      `%c[WARN] ${new Date().toLocaleTimeString()} - ${message}`,
      'color: #f39c12; font-weight: bold;',
      ...optionalParams
    );
  }

  /**
   * エラーログ
   * 本番環境でも確実に開発者ツールに出力されます
   */
  public error(message?: string, ...optionalParams: any[]): void {
    console.error(
      `%c[ERROR] ${new Date().toLocaleTimeString()} - ${message}`,
      'color: #e74c3c; font-weight: bold; font-size: 11px;',
      ...optionalParams
    );
  }
}

export const logger = new Logger();
