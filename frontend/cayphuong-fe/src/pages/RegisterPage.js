import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo-cayphuong.png';
import { FiMail, FiLock } from 'react-icons/fi';

const RegisterPage = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !phone || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }
    setError('');
    // TODO: Gọi API đăng ký ở đây
    alert(`Đăng ký thành công!\nEmail: ${email}`);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Cây Phượng K18" className="login-logo" />
        <h2 className="login-title">Đăng ký</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group input-icon-group">
          <label htmlFor="email">Địa chỉ email</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@email.com"
              autoComplete="email"
            />
            <span className="input-icon"><FiMail /></span>
          </div>
        </div>
        <div className="form-group input-icon-group">
          <label htmlFor="phone">Số điện thoại</label>
          <div className="input-wrapper">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0123456789"
              autoComplete="tel"
            />
            <span className="input-icon"><FiLock /></span>
          </div>
        </div>
        <div className="form-group input-icon-group">
          <label htmlFor="password">Mật khẩu</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <span className="input-icon"><FiLock /></span>
          </div>
        </div>
        <div className="form-group input-icon-group">
          <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <span className="input-icon"><FiLock /></span>
          </div>
        </div>
        <button type="submit" className="login-btn">Đăng ký</button>
        <div className="divider">
          <span>hoặc</span>
        </div>
        <button type="button" className="register-btn" onClick={onSwitchToLogin}>Đăng nhập ngay</button>
      </form>
    </div>
  );
};

export default RegisterPage;
