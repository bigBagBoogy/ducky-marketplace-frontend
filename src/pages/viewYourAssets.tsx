// ViewYourAssets.tsx

import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import React, { useState, useEffect } from 'react';
import { useAddress } from '../components/AddressContext';
import { ethers } from 'ethers';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import 'isomorphic-fetch';


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
  key: string;
  name: string;
  value: {
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
          const data = await erc725js.fetchData('LSP3Profile');
          console.log('Data received:', data);
          setProfileData(data as any); // Adjust the type as per your schema
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


  // return the JSX code to render the profile data
  return (
    <div>
      {loading ? (
        // show a loading message
        <div>Loading profile data...</div>
      ) : profileData ? (
        // show the profile data
        <div>
          <h1 className="text-3xl font-bold mb-4">{profileData?.value?.LSP3Profile?.name}</h1>
          <p>{profileData?.value?.LSP3Profile?.description}</p>
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