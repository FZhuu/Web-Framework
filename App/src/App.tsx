import React from 'react';
import './App.css';
import Menu from './layouts/Menu';
import Footer from './layouts/Footer';
import Slider from './layouts/slider';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Login from './controller/login';
import Cadastro from './controller/cadastro';
import Perfil from './controller/Perfil'

function AppRoutes() {
  const location = useLocation();

  const WindowWidth = window.innerWidth;
  const WindowHeight = window.innerHeight;

  // Páginas onde o Menu NÃO deve aparecer
  const hideMenu = location.pathname === "/login" || location.pathname === "/cadastro";
  const hideSlider = location.pathname === "/login" || location.pathname === "/cadastro" || location.pathname === "/perfil";
  return (
  <div className='principal'>
      {!hideMenu && <Menu />}
      {!hideSlider && <Slider/>}
      <p>{WindowWidth}x{WindowHeight}</p>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<></>} />
      </Routes>
      {!hideMenu && <Footer />}
    </div>
  );
}

function App() {

  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
