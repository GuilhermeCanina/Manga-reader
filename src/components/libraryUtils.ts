import axios from 'axios';

interface Manga {
  id: string;
  title: string;
  coverUrl: string;
}

export const addToLibrary = async (manga: Manga) => {
  let library = JSON.parse(localStorage.getItem('library') || '[]');

  // Verificar se a URL da capa está vazia e buscar na API se necessário
  if (!manga.coverUrl) {
    const coverFileName = await getCoverUrl(manga.id);
    manga.coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;
  }

  if (!library.some((item: Manga) => item.id === manga.id)) {
    library.push(manga);
    localStorage.setItem('library', JSON.stringify(library));
  }
};

// Função auxiliar para buscar o nome da capa na API do MangaDex
const getCoverUrl = async (mangaId: string): Promise<string> => {
  const response = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
  const coverFileName = response.data.data.relationships.find((rel: any) => rel.type === 'cover_art')?.attributes.fileName;
  return coverFileName;
};

export const removeFromLibrary = (id: string) => {
  let library = JSON.parse(localStorage.getItem('library') || '[]');
  library = library.filter((manga: Manga) => manga.id !== id);
  localStorage.setItem('library', JSON.stringify(library));
};

export const isInLibrary = (id: string): boolean => {
  const library = JSON.parse(localStorage.getItem('library') || '[]');
  return library.some((manga: Manga) => manga.id === id);
};

export const getLibrary = (): Manga[] => {
  return JSON.parse(localStorage.getItem('library') || '[]');
};
