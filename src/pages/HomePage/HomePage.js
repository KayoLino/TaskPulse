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
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarClosed(!isSidebarClosed);
  }

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
    <>
      {/* SideBar */}
      <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <div className="conteiner-sidebar">
          <div className="logo">
            <i className='bx bx-crown'></i>
            <div>T<span>a</span>skPulse</div>
          </div>

          <div className="profile">
            <img src={Profile} alt="" />
            <div>{username}</div>
          </div>

          <ul className="menu-sidebar">
            <li><Link><i className='bx bx-user-circle'></i><span>Editar Perfil</span> </Link></li>
            <li><Link><i className='bx bx-cog' ></i><span>Configurações</span></Link></li>
            <li><Link><i className='bx bx-info-circle' ></i><span>Ajuda e Suporte</span></Link></li>
          </ul>

          <ul className="menu-sidebar">
            <li><Link className="logout"><i className='bx bx-log-out-circle' ></i> <span>Sair</span></Link></li>
          </ul>

        </div>
      </div>
      {/* End Of SideBar */}

      {/* NavBar */}
      <div className={`navbar ${isSidebarClosed ? 'large' : ''}`}>
        <i onClick={handleMenuClick} className='bx bx-menu'></i>
        <input type="search" />
        <button><i className='bx bx-search-alt-2' ></i></button>
        <i className='bx bx-bell' ></i>
      </div>
    </>
  );
}

export default HomePage;
