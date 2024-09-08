import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MangaDetails.css';
import { addToLibrary, removeFromLibrary, isInLibrary } from './libraryUtils';
import MangaReader from './MangaReader';

const MangaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalChapters, setTotalChapters] = useState(0);
  const [inLibrary, setInLibrary] = useState<boolean>(false);

  const chaptersPerPage = 25;

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/manga/${id}`, {
          params: {
            includes: ['cover_art'],
          },
        });
        setManga(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do mangá:', error);
      }
    };

    const fetchChapters = async () => {
      try {
        const response = await axios.get('https://api.mangadex.org/chapter', {
          params: {
            manga: id,
            translatedLanguage: ['pt-br'],
            limit: chaptersPerPage,
            offset: (currentPage - 1) * chaptersPerPage,
          },
        });
        setChapters(response.data.data);
        setTotalChapters(response.data.total);
      } catch (error) {
        console.error('Erro ao buscar os capítulos do mangá:', error);
      }
    };

    if (id) {
      fetchMangaDetails();
      fetchChapters();
      setInLibrary(isInLibrary(id));
    }
  }, [id, currentPage]);

  const handleLibraryToggle = async () => {
    if (id && manga) {
      const coverFileName = manga.relationships.find((rel: any) => rel.type === 'cover_art')?.attributes.fileName;
      const coverUrl = coverFileName
        ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`
        : '';
      
      if (inLibrary) {
        removeFromLibrary(id);
      } else {
        await addToLibrary({ id, title: manga.attributes.title.en, coverUrl });
      }
      setInLibrary(!inLibrary);
    }
  };

  if (!manga) {
    return <div>Carregando...</div>;
  }

  const coverFileName = manga.relationships.find((rel: any) => rel.type === 'cover_art')?.attributes.fileName;
  const coverUrl = coverFileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`
    : '';

  const totalPages = Math.ceil(totalChapters / chaptersPerPage);

  return (
    <div className="manga-details-container">
      <img src={coverUrl} alt={manga.attributes.title.en} className="cover-image" />
      <h1>{manga.attributes.title.en}</h1>
      <p>{manga.attributes.description.en}</p>
      <button onClick={handleLibraryToggle}>
        {inLibrary ? 'Remover da Biblioteca' : 'Adicionar à Biblioteca'}
      </button>
      <h2>Capítulos</h2>
      <ul className="chapter-list">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="chapter-item">
            <Link to={`/manga/${id}/chapter/${chapter.id}`}>
              {chapter.attributes.title || `Capítulo ${chapter.attributes.chapter}`}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MangaDetails;
