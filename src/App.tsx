import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import MenuComponent from './common/MenuComponent';

function App() {

  return (
    <BrowserRouter>
      <MenuComponent/>
    </BrowserRouter>
  );

}

export default App;
