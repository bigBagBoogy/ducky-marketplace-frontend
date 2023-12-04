// useMint.ts
import { useState } from 'react';

interface MintHook {
  mintNFT: (formData: FormData) => void;
  error: string | null;
}

const useMint = (): MintHook => {
  const [error, setError] = useState<string | null>(null);

  const mintNFT = async (formData: FormData) => {
    try {
      // Assuming you have an API endpoint to handle the form data
      const response = await fetch('your-backend-endpoint', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to mint NFT');
      }

      const data = await response.json();
      console.log(data);

    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return { mintNFT, error };
};

export default useMint;
