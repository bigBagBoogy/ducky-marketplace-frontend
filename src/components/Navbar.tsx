// components/Navbar.tsx

import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';

const Navbar: React.FC = () => {
    return (
      <nav className="bg-gray-800 p-1">
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-0">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white font-bold text-lg">
               <img id="logo" src="./logo.png" alt="Logo" />
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
