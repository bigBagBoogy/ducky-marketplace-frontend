// components/Navbar.tsx

import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface NavbarProps {
  setSigner?: (signer: ethers.Signer) => void;
}


const Navbar: React.FC<NavbarProps> = ({ setSigner }) => {
  const { theme } = useTheme();
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {    
    setImgSrc(theme === 'dark' ? '/ducky_no_canvas.svg' : '/ducky_no_canvas_dark.svg');
  }, [theme]);

  return (
    <nav className="navbar">
  <div className="container mx-auto">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-16 sm:space-x-16">
        <ThemeToggle />
        <Link href="/">
              <img id="logo" src={imgSrc} alt="Logo" className="" />
            </Link>
      </div>
      <div className="hidden sm:flex space-x-4">
        <Link href="/admin" className="text-white text-xl">
          Login
        </Link>
        <Link href="/mint" className="text-white text-xl">
          Mint
        </Link>
        <Link href="/viewProfile" className="text-white text-xl">
          View your Profile
        </Link>   
        <Link href="/viewAssets" className="text-white text-xl">
          View your Assets
        </Link>  {/* @ts-ignore */}   
        <WalletConnectButton setSigner={setSigner} />
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
