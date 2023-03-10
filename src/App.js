import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Employees from './Employees';
import UserCard from './Card';
import User from './User';

function App(){
  return (
      <>
        <header>
          <Link to="/about">Список работников</Link>
            <Link to="/user">Профиль</Link>
        </header>
        <Routes>
          <Route path="/about" element={<Employees />} />
            <Route path="/user" element={<User />} />
        </Routes>
      </>
  );
}

export default App;
