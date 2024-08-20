import React, { useState } from 'react';
import MangaReaderOptions from './MangaReaderOptions';
import './MangaReader.css';

const MangaReader: React.FC = () => {
  const [options, setOptions] = useState({
    fitHeight: true,
    leftToRight: false,
    longStrip: false,
    headerHidden: false,
  });

  const handleOptionChange = (option: 'fitHeight' | 'leftToRight' | 'longStrip' | 'headerHidden', value: boolean) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };

  return (
    <div className={`manga-reader ${options.fitHeight ? 'fit-height' : ''} ${options.leftToRight ? 'left-to-right' : ''} ${options.longStrip ? 'long-strip' : ''}`}>
      {!options.headerHidden && <div className="manga-reader-header">Manga Reader</div>}
      <div className="manga-pages">
        {/* Aqui você renderiza as páginas do mangá */}
      </div>
      <MangaReaderOptions onChangeOption={handleOptionChange} />
    </div>
  );
};

export default MangaReader;