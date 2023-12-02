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
          className="hover:bg-black w-28 rounded-md border-aqua-500 border-4 "
          onClick={() => setTheme('light')}
        >
          <Image src="/sun.svg" alt="logo" height={50} width={50} />
        </button>
      ) : (
        <button
          className=" w-28 rounded-md border-aqua-500 border-4 hover:bg-gray-300"
          onClick={() => setTheme('dark')}
        >
          <Image src="/moon.svg" alt="logo" height={50} width={50} />
        </button>
      )}
    </div>  );
};

export default ThemeToggle;
