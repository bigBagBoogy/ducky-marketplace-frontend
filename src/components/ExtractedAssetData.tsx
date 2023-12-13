// @ts-nocheck
// ExtractedAssetData.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import { useAddress } from '../components/AddressContext';
import LSP4Schema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import 'isomorphic-fetch';
import InViewHandler from '../components/InViewHandler';

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
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-center">Your Assets:</h2>
      <div className="p-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {/* Map through the LSP4Metadata array */}
          {LSP4Metadata &&
  LSP4Metadata.map((metadata, index) => (
    <InViewHandler key={`${metadata.key}-${index}`} id={metadata.key} onInViewChange={handleInViewChange}>
      <div
        key={index}
        className={`max-w-md mx-auto bg-gray-500 rounded-md overflow-hidden shadow-md m-4 ${
          inViewRefs[metadata.key] ? 'animate-your-animation' : 'opacity-0 translate-y-20'
        }`}
        >
                  <img
                    className="w-full h-64 object-cover"
                    src={transformIpfsUrl(metadata?.value?.LSP4Metadata?.images?.[0]?.[0]?.url)}
                    alt={`Asset ${index + 1}`}
                  />
                  <div className="p-4">
                    <p className="text-xl font-bold mb-2">Asset {index + 1}</p>
                    <p className="">{metadata?.value?.LSP4Metadata?.description}</p>
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
