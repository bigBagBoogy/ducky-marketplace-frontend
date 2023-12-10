// src/pages/index.tsx
import Link from 'next/link';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar';
import FeaturingCard from '@/components/FeaturingCard';
import { useState } from "react";
import { ethers } from "ethers";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  return (
    <main>
      <Navbar setSigner={setSigner} />
      <FeaturingCard />
      <div className="header-box">
      <h1 className="text-5xl font-bold">
          Discover NFTs <br /> with redeemable <br /> perks
      </h1>
      <h2 className="text-2xl font-bold">An NFT Search Page to facilitate dynamic searching of traits, enabling users to effortlessly find redeemable perks they are interested in.</h2>
      <Link href="/search" legacyBehavior>
      <button className="button">
        Search
      </button>

    </Link>
    
      </div>
    </main>
  )
}
