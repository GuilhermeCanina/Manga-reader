import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Manga {
  id: string;
  title: string;
  fileName: string;
}

const Explore: React.FC = () => {
  const [mangaData, setMangaData] = useState<Manga[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async (query = '') => {
    try {
      const url = query 
        ? `https://api.mangadex.org/manga?title=${query}`
        : 'https://api.mangadex.org/manga';
      const response = await fetch(url);
      const data = await response.json();

      const mangas = await Promise.all(data.data.map(async (manga: any) => {
        const coverRelationship = manga.relationships.find((rel: any) => rel.type === 'cover_art');
        if (coverRelationship) {
          const coverId = coverRelationship.id;
          const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverId}`);
          const coverData = await coverResponse.json();
          return {
            id: manga.id,
            title: manga.attributes.title.en,
            fileName: coverData.data.attributes.fileName,
          };
        }
        return null;
      }).filter((manga: any) => manga !== null));

      setMangaData(mangas);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    fetchMangas(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for manga..."
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {mangaData.map(manga => (
          <div key={manga.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            {manga.fileName ? (
              <img
                src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.fileName}.256.jpg`}
                alt={manga.title}
                style={{ width: '100px', height: '150px' }}
              />
            ) : (
              <div style={{ width: '100px', height: '150px', backgroundColor: '#f0f0f0' }}>No Image</div>
            )}
            <p>{manga.title}</p>
            <Link to={`/manga/${manga.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;