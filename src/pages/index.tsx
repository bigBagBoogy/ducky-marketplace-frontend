// src/pages/index.tsx
import Link from 'next/link';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar';
import FeaturingCard from '@/components/FeaturingCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar />
      <FeaturingCard />
      <div className="header-box">
      <h1 className="text-6xl font-bold">
          Discover NFTs <br /> with redeemable <br /> perks
      </h1>
      <h2 className="text-3xl font-bold">An NFT Search Page to facilitate dynamic searching of traits, enabling users to effortlessly find redeemable perks they are interested in.</h2>
      <Link href="/search" legacyBehavior>
      <a className="custom-link px-8 py-4 rounded-md">
        Search
      </a>

    </Link>
    
      </div>
    </main>
  )
}
