import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mangadex.org'
});

export const getMangaList = async () => {
  const response = await api.get('/manga');
  return response.data.data;
};

export const getMangaDetails = async (id: string) => {
  const response = await api.get(`/manga/${id}`);
  return response.data;
};
