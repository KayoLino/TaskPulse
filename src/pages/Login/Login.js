import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import bcrypt from 'bcryptjs';
import { setAuthToken, clearAuthToken } from '../../components/auth';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState('');

  const navigate = useNavigate();

  clearAuthToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessageError('Por favor, preencha todos os campos!')
      return;
    }

    const usersCreate = JSON.parse(localStorage.getItem('users')) || [];

    let foundUser = null;
    for (let user of usersCreate) {
      if (username === user.username) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          foundUser = user; //Salvando usuario
          setAuthToken('Authenticated');
          navigate(`/HomePage/${foundUser.id}`); // Redireciona para a rota com o ID do usuário
          break;
        }
      }
    }

    if (!foundUser) {
      setMessageError('Nome ou senha inválida.');
      return;
    }

  };

  return (
    <div className="content-login">
      <img src={Logo} alt="" />
      <form className="login"
        onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }} />
        <input type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }} />
        {messageError && <div className="messageError">{messageError}</div>}
        <button type="submit" className="send-form">Entrar</button>
      </form>
      <div className="links">
        <Link to="/register" className="register"> Não tem uma conta? <br />Crie agora! </Link>
        <Link className="forgot-password">Esqueceu sua senha?</Link>
      </div>
    </div>
  );
}

export default Login;