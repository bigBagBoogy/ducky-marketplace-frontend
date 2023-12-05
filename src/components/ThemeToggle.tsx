// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const imgSrc = theme === 'dark' ? '/sun.svg' : '/moon.svg';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex justify-center">
      <button
        className={`rounded-md border-4 ${
          theme === 'light' ? 'border-rose-700 hover:bg-fuchsia-800' : 'border-aqua-500 hover:bg-rose-700'
        }`}
        onClick={toggleTheme}
      >
        <Image src={imgSrc} alt="Toggle Theme" height={30} width={30} />
      </button>
    </div>
  );
};

export default ThemeToggle;
