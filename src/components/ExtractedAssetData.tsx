// @ts-nocheck
// ExtractedAssetData.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { useAddress } from '../components/AddressContext';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import 'isomorphic-fetch';
import InViewHandler from '../components/InViewHandler';
import Checkbox from '../components/Checkbox';


// Static variables
const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';
// Parameters for the ERC725 instance
const config = { ipfsGateway: IPFS_GATEWAY };

type AssetInformation = {
  assetImageLinks: string[];
  fullSizeAssetImage: string;
  assetIconLinks: string[];
  fullSizeIconImage: string;
  assetDescription: string;
};

interface ExtractedAssetDataProps {
  assetValues: string[];
}
 
// Define fetchAssetData at the top level
async function fetchAssetData(assetAddress: string) {
  try {
    const digitalAsset = new ERC725(LSP4Schema, assetAddress, RPC_ENDPOINT, config);
    const metadata = await digitalAsset.fetchData('LSP4Metadata');
    return metadata;
  } catch (error) {
    console.log('Could not fetch asset data: ', error);
    return null;
  }
}

const ExtractedAssetData: React.FC<ExtractedAssetDataProps> = ({ assetValues }) => {
  const { address } = useAddress();
  const [LSP4Metadata, setLSP4Metadata] = useState<AssetInformation | null>(null);
  const [inViewRefs, setInViewRefs] = useState<Record<string, boolean>>({});
  const [isChecked, setIsChecked] = useState(false);

// In-view change handler
const handleInViewChange = useCallback((id: string, inView: boolean) => {
  setInViewRefs((prevInViewRefs) => ({
    ...prevInViewRefs,
    [id]: inView,
  }));
  console.log('InView Change:', id, inView);
}, [setInViewRefs]);



  useEffect(() => {
    async function fetchData() {
      const metadataPromises = assetValues.map(async (assetAddress) => {
        // console.log('Asset object:', await fetchAssetData(assetAddress));
        return await fetchAssetData(assetAddress);
      });

      const metadata = await Promise.all(metadataPromises);
      setLSP4Metadata(metadata);
    }

    fetchData();
  }, [assetValues]);


  const transformIpfsUrl = (ipfsUrl?: string): string => {
    if (!ipfsUrl) {
      // Handle the case where ipfsUrl is undefined or null
      return ''; // You can return a default URL or an empty string, depending on your requirements
    }
  
    const ipfsHash = ipfsUrl.replace('ipfs://', ''); // Remove 'ipfs://' prefix
    const transformedUrl = `https://universalpage.dev/api/ipfs/${ipfsHash}`;
    return transformedUrl;
  };

   // Checkbox change handler
   const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  

  return (
    <div>
     <h2 className="text-4xl font-bold mb-2 text-center">Your Assets:</h2>
      {/* Checkbox component */}
     <Checkbox handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
      <div className="p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {/* Map through the LSP4Metadata array */}
          {LSP4Metadata &&
           LSP4Metadata.map((metadata, index) => (
           <InViewHandler key={`${metadata.key}-${index}`} id={metadata.key} onInViewChange={handleInViewChange}>
           <div
        key={index}
        className={`bg-gray-600 mb-16 p-2 rounded-xl your-tailwind-classes ${
          inViewRefs[metadata.key] ? 'animate-your-animation' : 'opacity-0 translate-y-20'
        }`}
        >
          {isChecked ? (
                  // Display description if checkbox is checked
                  <p className="">{metadata?.value?.LSP4Metadata?.description}</p>
                ) : (
                  // Display image if checkbox is not checked
                
                  <img
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                    src={transformIpfsUrl(metadata?.value?.LSP4Metadata?.images?.[0]?.[0]?.url)}
                    alt={`Asset ${index + 1}`}
                  />)}
                  <div className="p-4">
                    <p className="text-xl font-bold mb-2">Asset {index + 1}</p>
                  </div>
                </div>
              </InViewHandler>
            ))}
        </div>
      </div>
    </div>
  );
  
            } 
export default ExtractedAssetData;
