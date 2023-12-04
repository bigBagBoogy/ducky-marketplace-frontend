// mint.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useFormik } from 'formik';
import useHandleImage from '../components/useHandleImage';
const Mint = () => {
    
const [nftName, setNftName] = useState("");
const [nftSymbol, setNftSymbol] = useState("");

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
  onSubmit: (values) => {
    console.log(values);
  },
});

return (
    <>
       <Navbar />
      <h1 className="text-5xl font-bold mb-0 text-white text-center justify-items-center">Mint your NFT with Perks</h1>
      <form className="grid grid-cols-2 gap-36 mx-auto max-w-[60vw] mt-8 items-center">
        {/* Left column for image drop zone */}
        <div className="col-span-1 aspect-square">
          <label htmlFor="imageInput" className="border-dashed border-4 border-gray-300 p-8 w-full h-full flex flex-col items-center justify-center">
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
  <div className="col-span-1">
    <input
      className="input w-full mb-4"
      name="nftName"
      type="text"
      placeholder="Enter NFT Name"
      onChange={formik.handleChange}
      value={formik.values.nftName}
    />

    <input
      className="input w-full"
      name="nftSymbol"
      type="text"
      placeholder="Enter NFT Symbol"
      onChange={formik.handleChange}
      value={formik.values.nftSymbol}
    />
  </div>
</form>
      </>
);

}
export default Mint;