import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar.jsx';
import RoomChoose from './RoomChoose/RoomChoose.jsx';
import Room from './Room/Room.jsx';
import { api } from './backend.js';

/**
 * @returns {JSX.Element} Main App component
 */
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('id_token') && !user) {
      const timeout = setTimeout(() => fetch(`${api}users/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(setUser), 50);
      return () => clearTimeout(timeout);
    }
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <RoomChoose
              setUser={ setUser }
              user={ user }
            />
          }
        />
        <Route
          path='/room/:id'
          element={ <Room user={ user } /> }
        />
      </Routes>
    </BrowserRouter>
  );
}
