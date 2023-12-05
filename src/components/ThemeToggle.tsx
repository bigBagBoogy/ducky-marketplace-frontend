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
    setButtonStyle(
      theme === 'dark'
        ? 'rounded-md border-4 border-aqua-500 hover:bg-fuchsia-300'
        : 'rounded-md border-4 border-rose-700 hover:bg-rose-300'
    );

    // Update image source based on theme
    setImgSrc(theme === 'dark' ? '/sun.svg' : '/moon.svg');
  }, [theme]);

  const toggleTheme = () => {
    setIsLoading(true);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex justify-center">
      <button className={buttonStyle} onClick={toggleTheme}>
        {imgSrc && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={imgSrc} alt="Toggle Theme" height={30} width={30} />
          </div>
        )}
      </button>
    </div>
  );
};


export default ThemeToggle;
