// searchResults.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    console.log('Checkbox state changed:', isChecked);
    setIsChecked(!isChecked);
  };

  // Dummy NFT data (replace with actual data)
  const nftData = [
    { id: 1, title: 'NFT 1', imageUrl: '/dummy NFTs/bearImage.png', description: 'Free ride to the moon with Virgin atlantic' },
    { id: 2, title: 'NFT 2', imageUrl: '/dummy NFTs/robotImage.png', description: 'Early access to CryptoZombiesII' },
    { id: 3, title: 'NFT 3', imageUrl: '/dummy NFTs/apeImage.png', description: 'Airdrop exposure x2' },
    // Add more NFT data as needed
  ];

  return (
    <>
      <Navbar />
       <div className="p-8 max-w-screen-xl mx-auto"> {/* limits display width */}
        <div className="p-8 max-w-screen-xl mx-auto flex items-center"> 
         <div className="flex-1 p-4 flex items-center"> 
         <div className="flex-shrink-0 w-72">
  {isChecked ? ( <h1 className="text-5xl font-bold mb-0 text-white">Show Perks</h1> ) : ( <h1 className="text-5xl font-bold mb-0 text-white">Show NFTs</h1> )} 
  </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        value=""
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
className={`group peer ring-aqua-500 ring-4 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-24 h-12 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 peer-checked:after:translate-x-12 peer-hover:after:scale-125`}
></div>
    </label>
  </div>
</div>

        <div className="grid grid-cols-3 gap-6">
          {nftData.map((nft) => (
            <div key={nft.id} className="bg-gray-800 p-6 rounded-md"> {/* This is the card*/}
              {isChecked ? (
                <p className="text-2xl h-56 font-bold text-white mb-4">{nft.description}</p>
              ) : (
                <img
                  src={nft.imageUrl}
                  alt={nft.title}
                  className="w-full h-56 object-cover mb-4 rounded-md"
                />
              )}
              <h2 className="text-lg font-bold text-white mb-2">{nft.title}</h2>
              {/* Additional NFT details can be added here */}
            </div>
          ))}
        </div>
      </div>      
    </>
  );
};

export default Checkbox;
