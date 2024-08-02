interface Manga {
  id: string;
  title: string;
  coverUrl: string;
}

export const addToLibrary = (manga: Manga) => {
  let library = JSON.parse(localStorage.getItem('library') || '[]');
  if (!library.some((item: Manga) => item.id === manga.id)) {
    library.push(manga);
    localStorage.setItem('library', JSON.stringify(library));
  }
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
