// src/components/GetAndDisplayAssets.tsx

import React, { useEffect, useState } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

interface GetAndDisplayAssetsProps {//@ts-ignore
    signer: ethers.Signer | undefined; } 

const RPC_URL = "https://rpc.testnet.lukso.network" 

const GetAndDisplayAssets: React.FC<GetAndDisplayAssetsProps> = ({ signer }) => {
    // Ensure signer is defined before using it in erc725js instantiation
    const erc725js = signer
      ? new ERC725(
          lsp3ProfileSchema as ERC725JSONSchema[],
          signer,
          'https://rpc.testnet.lukso.gateway.fm',
          {
            ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
          }
        )
      : null;
  
    const [profileData, setProfileData] = useState<string | null>(null);
  
    useEffect(() => {
      // Fetch profile data when the component mounts
      const fetchData = async () => {
        try {
          // Check if erc725js is defined before using it
          if (erc725js) {
            const data = await erc725js.getData();
            console.log(data);
            setProfileData(JSON.stringify(data));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [erc725js]); // Include erc725js in the dependency array
  
    return (
      <>
        <div>GetAndDisplayAssets</div>
        <div>{profileData}</div>
      </>
    );
  };
  
  export default GetAndDisplayAssets;