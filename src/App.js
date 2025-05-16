import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUserRequest, logout } from './redux/toonkit/userSlice';
import LoginForm from './components/LoginForm';
import './assets/css/App.css';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(fetchCurrentUserRequest());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    // Tự động chuyển về trang đăng nhập (không cần reload)
    // Nếu dùng React Router, có thể dùng `navigate('/login')`
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="welcome-container">
          <h2>Xin chào, {user?.name || user?.email}!</h2>
          <button onClick={handleLogout} className="btn btn-secondary">
            Đăng Xuất
          </button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;