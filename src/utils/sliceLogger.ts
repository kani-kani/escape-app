import { type Middleware } from '@reduxjs/toolkit';
import { logger } from './logger';

/**
 * Reducer発火時にStoreの中身を確認する
 * info情報で開発中のみ表示
 */
export const sliceLogger: Middleware<{}, any> = (storeApi) => (next) => (action) => {

  const result = next(action);

  logger.info('[update State]', storeApi.getState());

  return result;
};
