import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">NFT Marketplace</h1>
    </main>
  )
}
