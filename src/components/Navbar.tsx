// components/Navbar.tsx

import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="text-white font-bold text-lg">Your Logo</a>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              <a className="text-white">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-white">About</a>
            </Link>
            {/* Add more navigation links as needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
