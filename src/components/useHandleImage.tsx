// HandleImageProps.ts
import { ChangeEvent } from 'react';

interface HandleImageProps {
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useHandleImage = (): HandleImageProps => {
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader();

      // Set up the onload event for when the file is read
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          // Create an image element to get the dimensions
          const img = new Image();
          img.src = e.target.result.toString();

          // Log the dimensions
          console.log('Image dimensions:', img.width, 'x', img.height);

          // Your implementation for handling the selected image
        }
      };

      // Read the selected image as data URL
      reader.readAsDataURL(selectedImage);
    }
  };

  return { onImageChange };
};

export default useHandleImage;