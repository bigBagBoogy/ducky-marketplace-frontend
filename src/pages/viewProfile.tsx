// ViewProfile.tsx

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
        profileImage: {
          height: number;
          url: string;
        }[];
        backgroundImage: {
          height: number;
          url: string;
        }[];
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

  const transformIpfsUrl = (ipfsUrl: string): string => {
    const ipfsHash = ipfsUrl.replace('ipfs://', ''); // Remove 'ipfs://' prefix
    const transformedUrl = `https://universalpage.dev/api/ipfs/${ipfsHash}`;
    // console.log('IPFS URL:', ipfsUrl);
    // console.log('Transformed URL:', transformedUrl);
        return transformedUrl;
    
  };


  // return the JSX code to render the profile data
  return (
    <div>
      {loading ? (
        // show a loading message
        <div>Loading profile data...</div>
      ) : profileData ? (
        // show the profile data
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-700 rounded-lg shadow-md">
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <img
        className="w-16 h-16 object-cover rounded-full"
        src={transformIpfsUrl(profileData?.value?.LSP3Profile?.profileImage?.[0]?.url)}
        alt="Profile Image"
      />
    </div>
    <div className="ml-4">
      <p className="text-2xl font-bold mb-2">{profileData?.value?.LSP3Profile?.name}</p>
      <p className="text-sm text-white mb-4">Profile key: {profileData?.key}</p>
    </div>
  </div>

  <div className="mb-4">
    <img
      className="w-full h-64 object-cover rounded-lg"
      src={transformIpfsUrl(profileData?.value?.LSP3Profile?.backgroundImage?.[0]?.url)}
      alt="Background Image"
    />
  </div>

  <div className="mb-4">
    <p className="text-sm font-bold mb-1">{profileData?.value?.LSP3Profile?.links?.[0]?.title}</p>
    <p className="text-sm text-blue-100">{profileData?.value?.LSP3Profile?.links?.[0]?.url}</p>
  </div>

  <h1 className="text-3xl font-bold mb-2">{profileData?.value?.LSP3Profile?.name}</h1>
  <p className="text-sm text-white mb-4">Description: {profileData?.value?.LSP3Profile?.description}</p>

  {/* Add more sections as needed */}
</div>

      ) : (
        // handle the case where no data is available
        <div>No profile data available.</div>
      )}
    </div>
  );  
      }
export default Profile;