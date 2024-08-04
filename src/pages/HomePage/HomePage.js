import React, { useEffect } from 'react';
import './HomePage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../../components/auth';

const HomePage = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Você logou</h1>
      <p>ID do usuário: {id}</p>
    </div>
  );
}

export default HomePage;