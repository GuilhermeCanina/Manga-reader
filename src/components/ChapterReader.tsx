// src/components/ChapterReader.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChapterReader = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const fetchChapterPages = async () => {
      try {
        const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const data = await response.json();
        const baseUrl = data.baseUrl;
        const chapterHash = data.chapter.hash;
        const pageArray = data.chapter.data.map((page: string) => `${baseUrl}/data/${chapterHash}/${page}`);
        setPages(pageArray);
      } catch (error) {
        console.error('Error fetching chapter pages:', error);
      }
    };

    fetchChapterPages();
  }, [chapterId]);

  return (
    <div>
      {pages.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {pages.map((page, index) => (
            <img key={index} src={page} alt={`Page ${index + 1}`} style={{ width: '100%' }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterReader;
