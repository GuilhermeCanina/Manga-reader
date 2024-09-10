// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Library from './components/Library';
import Explore from './components/Explore';
import MangaDetails from './components/MangaDetails'; // Incluindo MangaDetails
import Options from './components/Options';
import ChapterReader from './components/ChapterReader';
import Home from './components/Home'; // Incluindo a nova página Home
import { ThemeProvider, useTheme } from './contexts/ThemeContext'; // Importar ThemeProvider
import './App.css';

const AppContent: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link> {/* Adicionando o link para a página Home */}
            <Link to="/library">Biblioteca</Link>
            <Link to="/explore">Explorar</Link>
            <Link to="/options">Opções</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Definindo a rota para a Home */}
            <Route path="/library" element={<Library />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/options" element={<Options />} />
            <Route path="/manga/:id" element={<MangaDetails />} />
            <Route path="/manga/:id/chapter/:chapterId" element={<ChapterReader />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
