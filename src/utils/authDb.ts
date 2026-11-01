/**
 * パスワードをSHA-256でハッシュ化
 */
async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * IndexedDB の初期化
 * データベース名: 'EscapeAppDB', ストア名: 'users'
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EscapeAppDB', 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('users')) {
        // ユーザー名を一意の主キーにする
        db.createObjectStore('users', { keyPath: 'username' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function registerUser(username: string, password: string): Promise<{ success: boolean; message: string }> {
  const db = await openDB();
  const hashedPassword = await hashPassword(password);

  return new Promise((resolve) => {
    const transaction = db.transaction('users', 'readwrite');
    const store = transaction.objectStore('users');

    // 主キー（ユーザー名）で既にあるか確認
    const checkRequest = store.get(username);

    checkRequest.onsuccess = () => {
      if (checkRequest.result) {
        resolve({ success: false, message: 'このユーザー名は既に登録されています' });
        return;
      }

      // 存在しない場合は新規保存
      const addRequest = store.add({ username, password: hashedPassword });
      addRequest.onsuccess = () => resolve({ success: true, message: '登録が完了しました' });
      addRequest.onerror = () => resolve({ success: false, message: '登録に失敗しました' });
    };
  });
}

/**
 * ユーザー認証（ログイン判定）
 * @param username ユーザー名
 * @param password ハッシュ前のパスワード
 */
export async function authenticateUser(username: string, password: string): Promise<{ success: boolean; message: string }> {
  const db = await openDB();
  const hashedPassword = await hashPassword(password);

  return new Promise((resolve) => {
    const transaction = db.transaction('users', 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(username);

    request.onsuccess = () => {
      const user = request.result;
      if (!user) {
        resolve({ success: false, message: 'ユーザー名が見つかりません' });
        return;
      }

      if (user.password === hashedPassword) {
        resolve({ success: true, message: 'ログイン成功' });
      } else {
        resolve({ success: false, message: 'パスワードが間違っています' });
      }
    };
    request.onerror = () => resolve({ success: false, message: 'エラーが発生しました' });
  });
}
