import React, { useState } from 'react';
import './MangaReaderOptions.css';

interface MangaReaderOptionsProps {
  onChangeOption: (option: 'fitHeight' | 'leftToRight' | 'longStrip' | 'headerHidden', value: boolean) => void;
}

const MangaReaderOptions: React.FC<MangaReaderOptionsProps> = ({ onChangeOption }) => {
  const [options, setOptions] = useState({
    fitHeight: true,
    leftToRight: false,
    longStrip: false,
    headerHidden: false,
  });

  const handleOptionChange = (option: 'fitHeight' | 'leftToRight' | 'longStrip' | 'headerHidden') => {
    setOptions((prevOptions) => {
      const newOptions = {
        ...prevOptions,
        [option]: !prevOptions[option],
      };
      onChangeOption(option, newOptions[option]);
      return newOptions;
    });
  };

  return (
    <div className="manga-reader-options">
      <button onClick={() => handleOptionChange('fitHeight')}>
        {options.fitHeight ? 'Fit Width' : 'Fit Height'}
      </button>
      <button onClick={() => handleOptionChange('leftToRight')}>
        {options.leftToRight ? 'Right to Left' : 'Left to Right'}
      </button>
      <button onClick={() => handleOptionChange('longStrip')}>
        {options.longStrip ? 'Single Page' : 'Long Strip'}
      </button>
      <button onClick={() => handleOptionChange('headerHidden')}>
        {options.headerHidden ? 'Show Header' : 'Hide Header'}
      </button>
    </div>
  );
};

export default MangaReaderOptions;
