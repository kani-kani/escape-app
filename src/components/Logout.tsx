import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../app/loginSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={handleLogout}
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}>
            ログアウトして終了
        </button>
    </div>
  );
}
