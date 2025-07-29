import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo-cayphuong.png';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setError('');
    // TODO: Gọi API đăng nhập ở đây
    alert(`Đăng nhập thành công!\nUsername: ${username}`);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Cây Phượng K18" className="login-logo" />
        <h2 className="login-title">Đăng nhập để trải nghiệm dịch vụ</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group input-icon-group">
          <label htmlFor="username">Địa chỉ email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="alex@email.com"
              autoComplete="username"
            />
            <span className="input-icon"><FiMail /></span>
          </div>
        </div>
        <div className="form-group input-icon-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <span className="input-icon"><FiLock /></span>
          </div>
        </div>
        <div className="login-options">
          <a href="#" className="forgot-password">Quên mật khẩu ?</a>
        </div>
        <button type="submit" className="login-btn">Đăng nhập</button>
        <div className="divider">
          <span>hoặc</span>
        </div>
        <button type="button" className="register-btn" onClick={onSwitchToRegister}>Đăng ký ngay</button>
      </form>
    </div>
  );
};

export default LoginPage;
