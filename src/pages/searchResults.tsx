// searchResults.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useInView } from 'react-intersection-observer';
import nftData from '../../public/LSP8s.json';
import Checkbox from '../components/Checkbox';

const SearchResults = () => {
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
      <Checkbox handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
      <div className="p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {nftData.map((nft) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.2,
              onChange: (inView) => handleInViewChange(nft.id.toString(), inView),
            });
  
            const imageUrl = nft.value.LSP4Metadata.images && nft.value.LSP4Metadata.images[0] && nft.value.LSP4Metadata.images[0][2] && nft.value.LSP4Metadata.images[0][2].url;
            console.log('Image URL:', imageUrl);
            console.log(transformIpfsUrl(imageUrl));
  
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
                  imageUrl && (
                    <img
                      src={transformIpfsUrl(imageUrl)}
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
        }

export default SearchResults;