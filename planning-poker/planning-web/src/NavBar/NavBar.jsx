import React from 'react';
import './NavBar.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

/**
 * @returns {JSX.Element} NavBar Component
 */
export default function NavBar() {
  return (
    <nav className='nav-bar container'>
      <a href='/'>
        <h1>Planning Poker</h1>
      </a>
      <ThemeToggle />
    </nav>
  );
}
