import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import './App.css';
import { CreateGoods } from './pages/CreateGoods';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<AdminPage />} />
        <Route path='/create_goods' element={<CreateGoods />} />
      </Routes>
    </div>
  );
}

export default App;
