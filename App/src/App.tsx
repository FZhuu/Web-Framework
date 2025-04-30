import React from 'react';
import './App.css';
import Menu from './layouts/Menu';
import Slider from './layouts/slider';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Login from './controller/login';
import Cadastro from './controller/cadastro';

function AppRoutes() {
  const location = useLocation();
  
  // Páginas onde o Menu NÃO deve aparecer
  const hideMenu = location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </>
  );
}

function App() {


  return (
    <div className='principal'>
      {/* <Slider></Slider> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
