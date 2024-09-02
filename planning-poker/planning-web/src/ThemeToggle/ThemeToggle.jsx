import React from 'react';
import './ThemeToggle.css';
import Sun from '../../public/Sun.jsx';
import Moon from '../../public/Moon.jsx';

/**
 * @returns {JSX.Element} ThemeToggle Component
 */
export default function ThemeToggle() {
  return (
    <button
      className='theme-toggle v-container-h'
      onClick={
        () => {
          if (document.body.classList.contains('dark')) document.body.classList.remove('dark');
          else document.body.classList.add('dark');
        }
      }
    >
      <div className='v-container'>
        <Sun />
        <Moon />
      </div>
    </button>
  );
}
