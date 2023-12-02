// components/Navbar.tsx

import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

const Navbar: React.FC = () => {
  const { theme } = useTheme();
    return (
      <nav className={`p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-0">
            <div className="flex items-center space-x-4">
            <ThemeToggle />
              <Link href="/" className="text-white font-bold text-lg">
               <img id="logo" src="./ducky_a.png" alt="Logo" />
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-white text-3xl ">
                Home
              </Link>
              <Link href="/mint" className="text-white text-3xl ">
                Mint
              </Link>
              <WalletConnectButton />
            </div>
          </div>
        </div>        
      </nav>
    );
  };
  
export default Navbar;
