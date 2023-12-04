// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggle: React.FC = () => {
const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
<div className="flex justify-center">
      {theme === 'dark' ? (
        <button
          className="hover:bg-rose-700 rounded-md border-aqua-500 border-4 "
          onClick={() => setTheme('light')}
        >
          <Image src="/sun.svg" alt="logo" height={30} width={30} />
        </button>
      ) : (
        <button
          className="rounded-md border-rose-700 border-4 hover:bg-fuchsia-800"
          onClick={() => setTheme('dark')}
        >
          <Image src="/moon.svg" alt="logo" height={30} width={30} />
        </button>
      )}
    </div>  );
};

export default ThemeToggle;
