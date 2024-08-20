import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Options: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <h1>Opções</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
      </button>
    </div>
  );
};

export default Options;
