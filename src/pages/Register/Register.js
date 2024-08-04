import React, { useState } from 'react';
import './Register.css';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from './useFormValidation';
import bcrypt from 'bcryptjs';
import { clearAuthToken } from '../../components/auth';

const Register = () => {

  //Validar Formulario
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorUserName, setErrorUsername] = useState('');

  const navigate = useNavigate();

  const formValidation = useFormValidation();

  clearAuthToken();

  //Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValidation.validade(username, email, password, confirmPassword)) {
      return;
    }

    const id = Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);

    //Usuarios
    const user = {
      id,
      username,
      email,
      password: hashedPassword,
    }

    const usersList = JSON.parse(localStorage.getItem('users')) || [];
    const userExist = usersList.some(user => user.username === username);
    const emailExist = usersList.some(user => user.email === email);

    if (userExist) {
      setErrorUsername('Nome de usuário já está em uso.');
    }
    else if (emailExist) {
      setErrorUsername('Email já está em uso.');
    }
    else {
      usersList.push(user);
      localStorage.setItem('users', JSON.stringify(usersList));

      //Limpar os campos
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      //Mandar pra pagina de Login
      navigate('/login');

    }

  }

  return (

    <div className="conteiner-register">
      <img src={Logo} alt="" />

      <form type="submit" onSubmit={handleSubmit} action="#" className="register">
        <h1>Registro</h1>
        <input type="text" placeholder="Usuário"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input type="text" placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }} />
        <input type="password" placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }} />
        <input type="password" placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }} />

        {errorUserName && <div className="messageError">{errorUserName}</div>}
        {formValidation.errorMessage && <div className="messageError">{formValidation.errorMessage}</div>}
        <button>Registrar</button>
      </form>

      <Link to="/login" className="login-page">Já possui uma conta?</Link>

    </div>
  );
}

export default Register;