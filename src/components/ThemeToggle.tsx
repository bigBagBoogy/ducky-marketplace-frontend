import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [buttonStyle, setButtonStyle] = useState('');
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    
    // Update image source based on theme
    setImgSrc(theme === 'dark' ? '/sun.svg' : '/moon.svg');
    // console.log('Image Source:', imgSrc);
  }, [theme]);

  const toggleTheme = () => {
    setIsLoading(true);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex justify-center">
      <button className="button" onClick={toggleTheme}>
        {imgSrc && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={imgSrc} alt="Toggle Theme" height={40} width={40} />

          </div>
        )}
      </button>
    </div>
  );
};


export default ThemeToggle;
