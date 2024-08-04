import React, { useState, useEffect } from 'react';
import './Home.css';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../../components/auth';

export default function Home() {
  const [message, setMessage] = useState('Bem Vindo (a) !');
  const [fade, setFade] = useState(false);

  clearAuthToken();


  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 3000);


    const messageChange = setTimeout(() => {
      setMessage('Estamos felizes em vê-lo aqui!');
      setFade(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(messageChange);
    };
  }, []);

  return (
    <div className='conteiner'>
      <img src={Logo} alt="" />
      <div className="content">
        <div className="comment">
          <h1 className={fade ? 'fade-out' : ''}>{message}</h1>
          <p>Revolucione a forma como você organiza suas tarefas. Com a TaskPulse, você terá uma visão clara de seus projetos e poderá gerenciar suas atividades com facilidade e eficiência.</p>
          <div className="enter">
            <Link className="entry-now" to="/login">Começar Agora</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
