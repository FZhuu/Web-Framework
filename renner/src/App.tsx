import React from 'react';
import './App.css';
import Menu from './layouts/Menu';
import Slider from './layouts/slider';

function App() {
  return (
    <div className="container">
      <Menu />
      <Slider></Slider>
    </div>
  );
}

export default App;
