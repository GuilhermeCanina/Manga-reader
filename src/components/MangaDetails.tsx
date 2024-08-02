// src/components/MangaDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MangaDetails.css'; // Importe o arquivo CSS
import { addToLibrary, removeFromLibrary, isInLibrary } from './libraryUtils';

const MangaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mangaDetails, setMangaDetails] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [inLibrary, setInLibrary] = useState<boolean>(false);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaResponse = await fetch(`https://api.mangadex.org/manga/${id}`);
        const mangaData = await mangaResponse.json();
        setMangaDetails(mangaData.data);

        const coverArt = mangaData.data.relationships.find((rel: any) => rel.type === 'cover_art');
        if (coverArt) {
          const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverArt.id}`);
          const coverData = await coverResponse.json();
          const coverFileName = coverData.data.attributes.fileName;
          setCoverUrl(`https://uploads.mangadex.org/covers/${id}/${coverFileName}.512.jpg`);
        } else {
          setCoverUrl('https://via.placeholder.com/200x300?text=No+Image'); // URL de imagem placeholder
        }

        const chaptersResponse = await fetch(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=pt-br&order[chapter]=asc`);
        const chaptersData = await chaptersResponse.json();
        setChapters(chaptersData.data);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    if (id) {
      fetchMangaDetails();
      setInLibrary(isInLibrary(id));
    }
  }, [id]);

  const handleLibraryToggle = () => {
    if (id) {
      if (inLibrary) {
        removeFromLibrary(id);
      } else {
        addToLibrary({ id, title: mangaDetails.attributes.title.en, coverUrl });
      }
      setInLibrary(!inLibrary);
    }
  };

  if (!mangaDetails) return <div>Loading...</div>;

  return (
    <div className="manga-details">
      <div className="manga-header">
        <img src={coverUrl} alt={`${mangaDetails.attributes.title.en} cover`} className="manga-cover" />
        <div className="manga-info">
          <h1>{mangaDetails.attributes.title['pt-br'] || mangaDetails.attributes.title.en}</h1>
          <p>{mangaDetails.attributes.description['pt-br'] || mangaDetails.attributes.description.en}</p>
          <button onClick={handleLibraryToggle}>
            {inLibrary ? 'Remover da Biblioteca' : 'Adicionar à Biblioteca'}
          </button>
        </div>
      </div>
      <h2>Capítulos</h2>
      <ul className="chapter-list">
        {chapters.map(chapter => (
          <li key={chapter.id} className="chapter-item">
            <Link to={`/manga/${id}/chapter/${chapter.id}`}>
              Capítulo {chapter.attributes.chapter}: {chapter.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaDetails;