import React, { useState } from 'react';
import Navbar from '../components/Navbar';


const SearchPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [searchText, setSearchText] = useState('');

  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const types = ['Type 1', 'Type 2', 'Type 3'];

  const handleSearch = () => {
    console.log('Searching with:', selectedCategory, selectedType, isChecked, searchText);
  };

  return (
    <>
    <Navbar />
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-8 text-white">Search NFT Perks</h1>
      <div className="flex space-x-4 mb-6">
        {/* Category Dropdown */}
        <div>
          <label className="block text-lg font-medium text-white mb-2">Category</label>
          <select
            className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
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

        {/* Type Dropdown */}
        <div>
          <label className="block text-lg font-medium text-white mb-2">Type</label>
          <select
            className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
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

        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isChecked"
            className="mr-2"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="isChecked" className="text-lg font-medium text-white">
            Redeemable
          </label>
        </div>
      </div>

      {/* Text Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-white mb-2">Search Text</label>
        <input
          type="text"
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <button
        className="border-4 border-aqua-500 hover:border-green-500 text-aqua-500 hover:text-green-500 px-6 py-3 rounded-md text-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
    </>
  );
};

export default SearchPage;
