import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';



const SearchPage = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  // New state variables for the extended schema
  const [perkName, setPerkName] = useState('');
  const [assetAddress, setAssetAddress] = useState('');
  const [factoryAddress, setFactoryAddress] = useState('');
// search.tsx
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const types = ['Type 1', 'Type 2', 'Type 3'];

  const handleSearch = () => {
    console.log('Searching with:', {
      selectedCategory,
      selectedType,
      isChecked,
      searchText,
      perkName,
      assetAddress,
      factoryAddress,
    });

    // Perform your search logic here

    // Construct the search query or parameters based on your logic
    const queryParams = {
      category: selectedCategory,
      type: selectedType,
      checked: isChecked,
      text: searchText,
      // ... add other parameters as needed
    };

    // Use Next.js's router to navigate to the search result page
    router.push({
      pathname: '/searchResults', // Update with your actual search result page path
      query: queryParams,
    });
  };

  return (
    <>
      <Navbar />
      <div className="mb-2" >  {/* Checkbox */}
  <div className="relative">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="isChecked"
        className="mr-2 custom-checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="isChecked" className="text-md font-medium text-white">
        Redeemable
      </label>
    </div>
  </div>
</div>

      <div className="p-8 max-w-3xl mx-auto text-center">
        {/* <h1 className="text-3xl font-bold mb-8 text-white">Search NFT Perks</h1> */}

        <div className="mb-6">
          <label className="block text-base font-medium text-white mb-2">Perk Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            value={perkName}
            onChange={(e) => setPerkName(e.target.value)}
          />
        </div>

          {/* Type Dropdown */}
          <div>
          <label className="block text-base font-medium text-white mb-2">Perk Type</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

    
      
           {/* Category Dropdown */}
           <div>
          <label className="block text-base font-medium text-white mb-2">Category</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium text-white mb-2">Asset Address</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            value={assetAddress}
            onChange={(e) => setAssetAddress(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium text-white mb-2">Factory Address</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            value={factoryAddress}
            onChange={(e) => setFactoryAddress(e.target.value)}
          />
        </div>
      

    

      {/* Text Input */}
      <div className="mb-6">
        <label className="block text-base font-medium text-white mb-2">Search Text</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <button
        className="border-4 border-aqua-500 hover:border-green-500 text-aqua-500 hover:text-green-500 px-6 py-3 rounded-md text-base"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    </>
  );
};

export default SearchPage;
