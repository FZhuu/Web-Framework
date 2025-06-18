import React from 'react';
import './App.css';
import Menu from './layouts/Menu';
import Footer from './layouts/Footer';
import Slider from './layouts/slider';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Login from './controller/login';
import Cadastro from './controller/cadastro';
import Perfil from './controller/Perfil';
import MainIndex from "./layouts/MainIndex";
import { PerfilProvider } from './context/PerfilContext';
import { NomeProvider } from './context/NomeContext';

function AppRoutes() {
  const location = useLocation();

  // Páginas onde o Menu NÃO deve aparecer
  const hideMenu = location.pathname === "/login" || location.pathname === "/cadastro";
  const hideSlider = location.pathname === "/login" || location.pathname === "/cadastro" || location.pathname === "/perfil";
  const hideMain = location.pathname === "/login" || location.pathname === "/cadastro" || location.pathname === "/perfil";
  return (
    <>
      {!hideMenu && <Menu />}
      {!hideSlider && <Slider/>}
      {!hideMain && <MainIndex/>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<></>} />
      </Routes>
      {!hideMenu && <Footer />}
    </>
  );
}

function App() {

  return (
      <BrowserRouter>
          <PerfilProvider>
              <NomeProvider>
                <AppRoutes />
              </NomeProvider>
          </PerfilProvider>
      </BrowserRouter>
  );
}

export default App;
