// searchResults.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useInView } from 'react-intersection-observer';
import nftData from '../../public/LSP8s.json';
const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [inViewRefs, inViewRefsSetter] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInViewChange = (id: string, inView: boolean) => {
    console.log('InView Change:', id, inView);
    inViewRefsSetter((prevInViewRefs) => ({
      ...prevInViewRefs,
      [id]: inView,
    }));
  };

  const transformIpfsUrl = (ipfsUrl: string): string => {
    const ipfsHash = ipfsUrl.replace('ipfs://', ''); // Remove 'ipfs://' prefix
    const transformedUrl = `https://universalpage.dev/api/ipfs/${ipfsHash}`;
    console.log('IPFS URL:', ipfsUrl);
    console.log('Transformed URL:', transformedUrl);
        return transformedUrl;
    
  };

  
  return (
    <>
      <Navbar />
      <div className="p-8 max-w-screen-xl mx-auto flex items-center">
        <div className="flex-1 p-4 flex items-center">
          <div className="flex-shrink-0 w-72">
            {isChecked ? (
              <h1 className="text-4xl font-bold mb-0 text-white">Show NFTs</h1>
            ) : (
              <h1 className="text-4xl font-bold mb-0 text-white">Show Perks</h1>
            )}
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

      <div className="p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {nftData.map((nft) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.2, // Adjust threshold as needed
              onChange: (inView) => handleInViewChange(nft.id.toString(), inView),
            });

            console.log('Image URL:', nft.value.LSP4Metadata.images && nft.value.LSP4Metadata.images[0] && nft.value.LSP4Metadata.images[0][2] && nft.value.LSP4Metadata.images[0][2].url);
             
            console.log(transformIpfsUrl(nft.value.LSP4Metadata.images[0][2].url));

          return (
            <div
              key={nft.id}
              className={`bg-gray-800 mb-16 p-6 rounded-md your-tailwind-classes ${
                inViewRefs[nft.id.toString()] ? 'animate-your-animation' : 'opacity-0 translate-y-20'
              }`}
              ref={ref}
            >
              {isChecked ? (
                <p className="text-2xl h-56 font-bold text-white mb-4">{nft.value.LSP4Metadata.description}</p>
              ) : (
                nft.value.LSP4Metadata.images &&
                nft.value.LSP4Metadata.images[0] &&
                nft.value.LSP4Metadata.images[0][2] && (
                  <img
                    src={transformIpfsUrl(nft.value.LSP4Metadata.images[0][2].url)}
                    alt={nft.value.LSP4Metadata.description}
                    className="w-full h-56 object-cover mb-4 rounded-md"
                  />
                )
              )}
              <h2 className="text-lg font-bold text-white mb-2">{nft.value.LSP4Metadata.name}</h2>
              {/* Additional NFT details can be added here */}
            </div>
          );
        })}
      </div>
    </div>
  </>
);
};

export default Checkbox;