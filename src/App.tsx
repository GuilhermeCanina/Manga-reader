// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Library from './components/Library';
import Explore from './components/Explore';
import MangaDetails from './components/MangaDetails'; // Incluindo MangaDetails
import Options from './components/Options';
import ChapterReader from './components/ChapterReader';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/library">Biblioteca</Link>
          <Link to="/explore">Explorar</Link>
          <Link to="/options">Opções</Link>
        </nav>
        <Routes>
          <Route path="/library" element={<Library />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/options" element={<Options />} />
          {/* Caso precise adicione mais tarde uma rota para o managdetails (provavelmente não) */}
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/manga/:id/chapter/:chapterId" element={<ChapterReader />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
