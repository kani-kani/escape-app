import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuizList, setQuizLoading } from '../app/quizeSlice';
import { login } from '../app/store';
// import { authenticateUser, registerUser } from '../utils/authDb';
import { logger } from '../utils/logger';
import { loadQuizDataList } from './quize/quizDataLoader';

export default function Login() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [isRegisterMode, setIsRegisterMode] = useState(false);
  // const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoadQuizData = async () => {
    try {
        dispatch(setQuizLoading(true));
        const quizData = await loadQuizDataList();
        dispatch(setQuizList(quizData));
      } catch (error) {
      logger.error('ログイン時のクイズロードに失敗しました:', error);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage('');

  //   const trimmedName = username.trim() === '' ? 'ゲスト' : username.trim();

  //   // ゲストログインの場合の特別処理
  //   if (trimmedName === 'ゲスト') {
  //     dispatch(login('ゲスト'));
  //     await handleLoadQuizData();
  //     navigate('/', { replace: true });
  //     return;
  //   }

  //   if (password.length < 4) {
  //     setMessage('パスワードは4文字以上で入力してください');
  //     return;
  //   }

  //   if (isRegisterMode) {
  //     // 新規登録処理
  //     const result = await registerUser(trimmedName, password);
  //     setMessage(result.message);
  //     if (result.success) {
  //       setIsRegisterMode(false);
  //       setPassword('');
  //     }
  //   } else {
  //     // ログイン判定処理
  //     const result = await authenticateUser(trimmedName, password);
  //     if (result.success) {
  //       dispatch(login(trimmedName));
  //       await handleLoadQuizData();
  //       navigate('/', { replace: true });
  //     } else {
  //       setMessage(result.message);
  //     }
  //   }
  // };

  useEffect(() => {
    const autoLogin = async () => {
      dispatch(login('ゲスト'));
      await handleLoadQuizData();
      navigate('/', { replace: true });
    };

    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // ログイン処理を作るまで処理をスキップ
    // ログイン処理を作るまで処理をスキップ
    <div style={{ padding: '40px', textAlign: 'center' }}>
      {/* リダイレクトまでの一瞬だけ表示 */}
      <p>読み込み中...</p>
      {/* リダイレクトまでの一瞬だけ表示 */}
      <p>読み込み中...</p>
    </div>
    // <div style={{ padding: '40px', textAlign: 'center' }}>
    //   <h2>{isRegisterMode ? '新規ユーザー登録' : 'ログイン'}</h2>
    //     <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
    //       <h3 style={{ 
    //         color: "#ff6b6b",
    //         fontSize: "14px",
    //         fontWeight: "normal",
    //         textAlign: "left",
    //         whiteSpace: "pre-line",
    //         lineHeight: "1.6",
    //         margin: "0 0 20px 0"
    //       }}>
    //         {`ブラウザで完結しているスタンドアローンアプリのためログイン非推奨。
    //           ユーザ名空でゲストログインできます`}
    //       </h3>
    //     </div>
    //   <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', width: '280px' }}>
    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="name-input" style={{ display: 'block', marginBottom: '5px' }}>ユーザー名：</label>
    //       <input
    //         id="name-input"
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         placeholder="未入力の場合はゲストになります"
    //         style={{ padding: '8px', width: '100%', fontSize: '16px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     {username.trim() !== '' && (
    //       <div style={{ marginBottom: '15px' }}>
    //         <label htmlFor="password-input" style={{ display: 'block', marginBottom: '5px' }}>パスワード：</label>
    //         <input
    //           id="password-input"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="4文字以上"
    //           required
    //           style={{ padding: '8px', width: '100%', fontSize: '16px', boxSizing: 'border-box' }}
    //         />
    //       </div>
    //     )}

    //     {message && <p style={{ color: message.includes('成功') || message.includes('完了') ? 'green' : 'red', fontSize: '14px' }}>{message}</p>}

    //     <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}>
    //       {isRegisterMode ? '登録する' : '進む'}
    //     </button>

    //     {username.trim() !== '' && (
    //       <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>
    //         {isRegisterMode ? 'すでにアカウントをお持ちですか？' : '初めてですか？'}{' '}
    //         <span 
    //           onClick={() => { setIsRegisterMode(!isRegisterMode); setMessage(''); }} 
    //           style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}
    //         >
    //           {isRegisterMode ? 'ログインはこちら' : '新規登録はこちら'}
    //         </span>
    //       </p>
    //     )}
    //   </form>
    // </div>
    // <div style={{ padding: '40px', textAlign: 'center' }}>
    //   <h2>{isRegisterMode ? '新規ユーザー登録' : 'ログイン'}</h2>
    //     <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
    //       <h3 style={{ 
    //         color: "#ff6b6b",
    //         fontSize: "14px",
    //         fontWeight: "normal",
    //         textAlign: "left",
    //         whiteSpace: "pre-line",
    //         lineHeight: "1.6",
    //         margin: "0 0 20px 0"
    //       }}>
    //         {`ブラウザで完結しているスタンドアローンアプリのためログイン非推奨。
    //           ユーザ名空でゲストログインできます`}
    //       </h3>
    //     </div>
    //   <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', width: '280px' }}>
    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="name-input" style={{ display: 'block', marginBottom: '5px' }}>ユーザー名：</label>
    //       <input
    //         id="name-input"
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         placeholder="未入力の場合はゲストになります"
    //         style={{ padding: '8px', width: '100%', fontSize: '16px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     {username.trim() !== '' && (
    //       <div style={{ marginBottom: '15px' }}>
    //         <label htmlFor="password-input" style={{ display: 'block', marginBottom: '5px' }}>パスワード：</label>
    //         <input
    //           id="password-input"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="4文字以上"
    //           required
    //           style={{ padding: '8px', width: '100%', fontSize: '16px', boxSizing: 'border-box' }}
    //         />
    //       </div>
    //     )}

    //     {message && <p style={{ color: message.includes('成功') || message.includes('完了') ? 'green' : 'red', fontSize: '14px' }}>{message}</p>}

    //     <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}>
    //       {isRegisterMode ? '登録する' : '進む'}
    //     </button>

    //     {username.trim() !== '' && (
    //       <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>
    //         {isRegisterMode ? 'すでにアカウントをお持ちですか？' : '初めてですか？'}{' '}
    //         <span 
    //           onClick={() => { setIsRegisterMode(!isRegisterMode); setMessage(''); }} 
    //           style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}
    //         >
    //           {isRegisterMode ? 'ログインはこちら' : '新規登録はこちら'}
    //         </span>
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
