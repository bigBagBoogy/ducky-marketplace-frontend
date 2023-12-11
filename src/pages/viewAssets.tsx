// viewAssets.tsx

import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import React, { useState, useEffect } from 'react';
import { useAddress } from '../components/AddressContext';
import { ethers } from 'ethers';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import 'isomorphic-fetch';
import ExtractedAssetData from '../components/ExtractedAssetData';


interface ProfileProps {
  address: string;
}

const Assets: React.FC<ProfileProps> = () => {
  const { address } = useAddress();
  // create a state variable to store the profile data
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [loading, setLoading] = useState(true);

  // define the ProfileData type alias
  type AssetData = {
    key: string;
    name: string;
    value: string[];
  };   

  // create an effect hook to fetch the profile data
  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        console.log('Fetching data for address:', address);
        const erc725js = new ERC725(
          lsp3ProfileSchema as ERC725JSONSchema[],
          address,
          'https://rpc.testnet.lukso.gateway.fm',
          {
            ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
          },
        );

        try {
          const data = await erc725js.fetchData('LSP5ReceivedAssets[]');
          console.log('Data received:', data);
          setAssetData(data as any); // Adjust the type as per your schema
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // You can check the type of error here or handle it as needed.
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Invalid address: undefined');
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  if (assetData) {   
    // Perform additional operations on assetData.value if needed
    assetData.value.forEach((asset, index) => {
      console.log("Asset Value:", asset);
      // Run your extra function here if needed    
    });
  }

  // return the JSX code to render the profile data
  return (
    <div>
      {loading ? (
        // show a loading message
        <div>Loading Asset data...</div>
      ) : assetData ? (  <>    
<p>{JSON.stringify(assetData.key)}</p>
<p >{JSON.stringify(assetData.name)}</p>
{assetData.value.map((asset, index) => (
      <p key={index}>{JSON.stringify(asset)}</p>
    ))}
<ExtractedAssetData assetValues={assetData.value} />
</>
      ) : (
        // handle the case where no data is available
        <div>No profile data available.</div>
      )}
    </div>
  );  
      }
export default Assets;