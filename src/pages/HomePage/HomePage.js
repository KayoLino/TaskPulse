import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../../components/auth';
import Profile from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState('');

  useEffect(() => {

    const usersList = JSON.parse(localStorage.getItem('users')) || [];
    const user = usersList.find(user => user.id === parseInt(id));
    if (user) {
      setUsername(user.username);
    }

    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate, id]);

  return (
    <div className="sidebar ">
      <div className="conteiner-sidebar">
        <div className="logo">
          <i class='bx bx-crown'></i>
          <div>T<span>a</span>skPulse</div>
        </div>

        <div className="profile">
          <img src={Profile} alt="" />
          <div>{username}</div>
        </div>

        <ul className="menu-sidebar">
          <li><Link><i class='bx bx-user-circle'></i><span>Editar Perfil</span> </Link></li>
          <li><Link><i class='bx bx-cog' ></i><span>Configurações</span></Link></li>
          <li><Link><i class='bx bx-info-circle' ></i><span>Ajuda e Suporte</span></Link></li>
        </ul>

        <ul className="menu-sidebar logout">
          <li><Link><i class='bx bx-log-out-circle' ></i> <span>Sair</span></Link></li>
        </ul>

      </div>
    </div>
  );
}

export default HomePage;