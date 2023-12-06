// components/Navbar.tsx

import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

const Navbar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <nav className="navbar">
  <div className="container mx-auto">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-16 sm:space-x-16">
        <ThemeToggle />
        <Link href="/" className="">
          <img id="logo" src="./ducky_no_canvas.svg" alt="Logo" className="" />
        </Link>
      </div>
      <div className="hidden sm:flex space-x-4">
        <Link href="/" className="text-white text-xl">
          Home
        </Link>
        <Link href="/mint" className="text-white text-xl">
          Mint
        </Link>
        <WalletConnectButton />
      </div>
      {/* Add a responsive menu for smaller screens */}
      <div className="sm:hidden">
        <button className="text-white text-xl">
          {/* Add a responsive menu icon (e.g., a hamburger icon) */}
          Menu
        </button>
        {/* Add a responsive menu items */}
        {/* You can use a library like 'react-responsive' or 'react-media' for better control */}
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
