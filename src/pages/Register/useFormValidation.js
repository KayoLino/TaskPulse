import { useState } from 'react';

const useFormValidation = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const validade = (username, email, password, confirmPassword) => {

    const isValidUsername = (username) => {
      if (username.length < 4) return false;
      return true;
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
      if (password.length < 3 || password.length > 12) return false;
      return true;
    }

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Todos os campos devem ser preenchidos.');
      return false;
    }

    if (!isValidUsername(username)) {
      setErrorMessage('O nome de usuário precisa ter mais de 3 caracteres.')
      return false;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Formato de email inválido.');
      return false;
    }

    if (!isValidPassword(password)) {
      setErrorMessage('A senha precisa ter entre 3 a 12 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas precisam ser iguais.');
      return false;
    }

    setErrorMessage('');
    return true;

  }

  return { errorMessage, validade };

}

export default useFormValidation;