// ViewYourAssets.tsx

import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import React, { useState, useEffect } from 'react';
import { useAddress } from '../components/AddressContext';
import { ethers } from 'ethers';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';
const SAMPLE_PROFILE_ADDRESS = '0x9139def55c73c12bcda9c44f12326686e3948634';

interface ProfileProps {
  address: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { address } = useAddress();
  // create a state variable to store the profile data
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // define the ProfileData type alias
type ProfileData = {
  LSP3Profile: {
    name: string;
    description: string;
    profileImage: string[];
    backgroundImage: string[];
    links: {
      title: string;
      url: string;
    }[];
  };
  LSP3IssuedIdentity: {
    issuer: string;
    claimType: string;
    claimValue: string;
    signature: string;
  };
  LSP1UniversalReceiverDelegate: {
    address: string;
  };
};



  // create an effect hook to fetch the profile data
  useEffect(() => {
    // check if the address is valid
    if (address) {
      console.log('Fetching data for address:', address); 
      // Fetching data for address: 0x3F0350EaFc25Cc9185a77394B7E2440ec002e466  = correct
      // create an instance of the ERC725 class
      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        address,
        'https://rpc.testnet.lukso.gateway.fm',
        {
          ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
        },
      );
      console.log("erc725js object: ",erc725js);
      // use the fetchData() function to fetch the profile data
      erc725js.fetchData().then(
        (data) => {
          console.log('Data received:', data);//@ts-ignore
          setProfileData(data as typeof data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false);
          // Optionally, you can set an error state to display an error message to the user.
        }
      );
    } else {
      console.log('Invalid address: undefined');
      setLoading(false); // Set loading to false since there's no address to fetch
    }
  }, [address]);

  // return the JSX code to render the profile data
  return (
    <div>
      {loading ? (
        // show a loading message
        <div>Loading profile data...</div>
      ) : profileData ? (
        // show the profile data
        <div>
          <h1>{profileData.LSP3Profile.name}</h1>
          <p>{profileData.LSP3Profile.description}</p>
          {/* ... */}
        </div>
      ) : (
        // handle the case where no data is available
        <div>No profile data available.</div>
      )}
    </div>
  );
};

export default Profile;