// SearchResults.tsx
import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import InViewHandler from '../components/InViewHandler'; // Import the InViewHandler component
import nftData from '../../public/LSP8s.json';
import Checkbox from '../components/Checkbox';

// SearchResults component
const SearchResults = () => {
  // State for handling checkbox status and in-view references
  const [isChecked, setIsChecked] = useState(false);
  const [inViewRefs, setInViewRefs] = useState<Record<string, boolean>>({});

  // Checkbox change handler
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

// In-view change handler
const handleInViewChange = useCallback((id: string, inView: boolean) => {
  setInViewRefs((prevInViewRefs) => ({
    ...prevInViewRefs,
    [id]: inView,
  }));
  console.log('InView Change:', id, inView);
}, [setInViewRefs]);

  // Function to transform IPFS URL
  const transformIpfsUrl = (ipfsUrl: string): string => {
    const ipfsHash = ipfsUrl.replace('ipfs://', '');
    const transformedUrl = `https://universalpage.dev/api/ipfs/${ipfsHash}`;
    console.log('IPFS URL:', ipfsUrl);
    console.log('Transformed URL:', transformedUrl);
    return transformedUrl;
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar />
      {/* Checkbox component */}
      <Checkbox handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
      {/* Main content */}
      <div className="p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {/* Map through the nftData array */}
          {nftData.map((nft) => (
            // Use InViewHandler component to handle in-view logic
            <InViewHandler key={nft.id} id={nft.id.toString()} onInViewChange={handleInViewChange}>
              {/* Individual grid item */}
              <div
                className={`bg-gray-800 mb-16 p-6 rounded-md your-tailwind-classes ${
                  inViewRefs[nft.id.toString()] ? 'animate-your-animation' : 'opacity-0 translate-y-20'
                }`}
              >
                {isChecked ? (
                  // Display description if checkbox is checked
                  <p className="text-2xl h-56 font-bold text-white mb-4">{nft.value.LSP4Metadata.description}</p>
                ) : (
                  // Display image if checkbox is not checked
                  nft.value.LSP4Metadata.images && nft.value.LSP4Metadata.images[0] && nft.value.LSP4Metadata.images[0][2] && (
                    <img
                      src={transformIpfsUrl(nft.value.LSP4Metadata.images[0][2].url)}
                      alt={nft.value.LSP4Metadata.description}
                      className="w-full h-56 object-cover mb-4 rounded-md"
                    />
                  )
                )}
                {/* Display NFT name */}
                <h2 className="text-lg font-bold text-white mb-2">{nft.value.LSP4Metadata.name}</h2>
              </div>
              {/* Close the InViewHandler */}
            </InViewHandler>
          ))}
        </div>
      </div>
    </>
  );
};

// Export the SearchResults component
export default SearchResults;
