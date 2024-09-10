import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  genres: string[];
}

const Home: React.FC = () => {
  const [featuredManga, setFeaturedManga] = useState<Manga | null>(null);
  const [recommendedMangas, setRecommendedMangas] = useState<Manga[]>([]);

  // Função para buscar dados de mangás populares
  const fetchMangas = async () => {
    try {
      const response = await axios.get('https://api.mangadex.org/manga', {
        params: {
          limit: 10,
          includes: ['cover_art', 'genre'],
          order: { followedCount: 'desc' }, 
        },
      });

      const mangas = response.data.data.map((mangaData: any) => {
        const attributes = mangaData.attributes;

        const title =
          attributes.title['ja-ro'] ||
          attributes.title.en ||
          attributes.title.jp ||
          'Título Desconhecido';

        const coverFileName = mangaData.relationships.find(
          (rel: any) => rel.type === 'cover_art'
        )?.attributes?.fileName;

        return {
          id: mangaData.id,
          title,
          coverUrl: `https://uploads.mangadex.org/covers/${mangaData.id}/${coverFileName}.256.jpg`,
          genres: attributes.tags.map((tag: any) => tag.attributes.name.en),
        };
      });

      
      setFeaturedManga(mangas[Math.floor(Math.random() * mangas.length)]);
      setRecommendedMangas(mangas);
    } catch (error) {
      console.error('Erro ao buscar mangás populares:', error);
    }
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  return (
    <div className="home-container">
     
      {featuredManga && (
        <Link to={`/manga/${featuredManga.id}`} className="banner" style={{ backgroundImage: `url(${featuredManga.coverUrl})` }}>
          <div className="banner-info">
            <h1>{featuredManga.title}</h1>
            <p>Gêneros: {featuredManga.genres.join(', ')}</p>
          </div>
        </Link>
      )}

      
      <section>
        <h2>Recomendados</h2>
        <div className="manga-grid">
          {recommendedMangas.map((manga) => (
            <Link to={`/manga/${manga.id}`} key={manga.id} className="manga-card">
              <img src={manga.coverUrl} alt={manga.title} />
              <p>{manga.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
