// useHandleImage.tsx

import { useState, ChangeEvent } from 'react';

interface HandleImageProps {
  onImageChange: (image: File | null) => void;
}

const useHandleImage = (): HandleImageProps => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    setImage(selectedImage);
  };

  return {
    onImageChange: handleImageChange,
  };
};

export default useHandleImage;
