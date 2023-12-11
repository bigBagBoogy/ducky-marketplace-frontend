// Import necessary modules and components

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ERC725 } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import 'isomorphic-fetch';

// Static variables
const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';
const SAMPLE_PROFILE_ADDRESS = '0x9139def55c73c12bcda9c44f12326686e3948634';

// Parameters for ERC725 Instance 
//@ts-ignore
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
const config = { ipfsGateway: IPFS_GATEWAY };

// Interface for Universal Profile metadata
interface ProfileMetadata {
  name: string;
  description: string;
  links: { title: string; url: string }[];
  tags: string[];
}

// Interface for Picture data
interface PictureData {
  key: string;
  url: string;
}

// Component for displaying Universal Profile data
const ProfileDisplay: React.FC = () => {
  const [profile, setProfile] = useState<ProfileMetadata | null>(null);
  const [backgroundImageLinks, setBackgroundImageLinks] = useState<PictureData[]>([]);
  const [fullSizeBackgroundImg, setFullSizeBackgroundImg] = useState<string>('');
  const [profileImageLinks, setProfileImageLinks] = useState<PictureData[]>([]);
  const [fullSizeProfileImg, setFullSizeProfileImg] = useState<string>('');

  // Fetch Universal Profile metadata
  const fetchProfileMetadata = async (address: string) => {
    try {//@ts-ignore
      const profile = new ERC725(erc725schema as Schema[], address, provider, config);//@ts-ignore
      const profileData = (await profile.fetchData('LSP3Profile')) as ProfileMetadata;

      // Set state variables
      setProfile(profileData);
    } catch (error) {
      console.log('This is not an ERC725 Contract: ', error);
    }
  };

  // Fetch Universal Profile picture data
  const fetchPictureData = async (address: string) => {
    try {//@ts-ignore
      const pictureData = (await fetchProfileData(address)) as ProfileMetadata;

      // Process picture data and set state variables//@ts-ignore
      const processedBackgroundImages = Object.entries(//@ts-ignore
        pictureData.value.LSP3Profile.backgroundImage,
      ).map(([key, value]) => ({
        key,//@ts-ignore
        url: value.url.replace('ipfs://', IPFS_GATEWAY),
      }));

      const processedProfileImages = Object.entries(//@ts-ignore
        pictureData.value.LSP3Profile.profileImage,
      ).map(([key, value]) => ({
        key,//@ts-ignore
        url: value.url.replace('ipfs://', IPFS_GATEWAY),
      }));

      setBackgroundImageLinks(processedBackgroundImages);
      setProfileImageLinks(processedProfileImages);
      setFullSizeBackgroundImg(processedBackgroundImages[0].url);
      setFullSizeProfileImg(processedProfileImages[0].url);
    } catch (error) {
      console.log('Could not fetch images: ', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProfileMetadata(SAMPLE_PROFILE_ADDRESS);
    fetchPictureData(SAMPLE_PROFILE_ADDRESS);
  }, []);

  // JSX for displaying profile information
  return (
    <div>
      {profile && (
        <>
          <h1>Name: {profile.name}</h1>
          <p>Description: {profile.description}</p>
          <div>
            <h2>Links:</h2>
            <p>Title of first Link: {profile.links[0].title}</p>
            <p>URL of first Link: {profile.links[0].url}</p>
          </div>
          <div>
            <h2>Tags:</h2>
            <p>First Tag: {profile.tags[0]}</p>
          </div>
          <div>
            <h2>Background Image:</h2>
            <img src={fullSizeBackgroundImg} alt="Background Image" />
          </div>
          <div>
            <h2>Profile Image:</h2>
            <img src={fullSizeProfileImg} alt="Profile Image" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDisplay;
