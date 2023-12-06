// mint.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useFormik } from 'formik';
import useHandleImage from '../components/useHandleImage';
import useMint from '../components/useMint';

const Mint: React.FC = () => {
  const { mintNFT, error } = useMint();
  const { onImageChange } = useHandleImage();

  const formik = useFormik({
    initialValues: {
      nftName: '',
      nftSymbol: '',
      description: '',
      links: '',
      tags: '',
      nftImage: '',
      bannerImage: '',
      perks: '',
    },
    onSubmit: async (values: Record<string, string>) => {
      const formData = new FormData();

      // Append each property to the FormData object
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      mintNFT(formData);
    },
  });

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mb-0 mt-8 text-white text-center justify-items-center">
        Mint your NFT with Perks
      </h1>
      <form className="grid grid-cols-2 gap-36 mx-auto max-w-[60vw] mt-8 items-center">
        {/* Left column for image drop zone */}
        <div className="col-span-1 aspect-square">
          <label
            htmlFor="imageInput"
            className="border-dashed"
          >
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            <span className="text-xl font-semibold text-gray-500">Drop Image Here</span>
          </label>
        </div>
        {/* Right column for input fields */}
        <div className="col-span-1 mt-4">
          <input
            className="input w-full mb-8"
            name="nftName"
            type="text"
            placeholder="Enter NFT Name"
            onChange={formik.handleChange}
            value={formik.values.nftName}
          />
          <input
            className="input w-full mb-8"
            name="nftSymbol"
            type="text"
            placeholder="Enter NFT Symbol"
            onChange={formik.handleChange}
            value={formik.values.nftSymbol}
          />
          <input
            className="input w-full mb-8"
            name="description"
            type="text"
            placeholder="Enter description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <input
            className="input w-full mb-8"
            name="links"
            type="text"
            placeholder="Enter links"
            onChange={formik.handleChange}
            value={formik.values.links}
          />
          <input
            className="input w-full mb-8"
            name="tags"
            type="text"
            placeholder="Enter NFT tags"
            onChange={formik.handleChange}
            value={formik.values.tags}
          />
          <input
            className="input w-full mb-8"
            name="perks"
            type="text"
            placeholder="Enter perks"
            onChange={formik.handleChange}
            value={formik.values.perks}
          />
        </div>
      </form>
    </>
  );
};

export default Mint;
