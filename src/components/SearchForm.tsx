// SearchForm.tsx
import React from 'react';
import { useFormikContext } from 'formik';

interface SearchFormValues {
  selectedCategory: string;
  selectedType: string;
  isChecked: boolean;
  searchText: string;
  perkName: string;
  assetAddress: string;
  factoryAddress: string;
  categories: string[];
  types: string[];
}

const SearchForm = () => {
  const formik = useFormikContext<SearchFormValues>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('Form Data:', formik.values);
    // You can perform other actions here if needed
    // Submit the form if necessary
    // formik.handleSubmit(event);
  };

  return (
    <> 
    <div className="flex justify-center items-center h-full">
    <div className="flex gap-16 mt-16">
        {/* Left Column */}
        <div className="flex flex-col">
          {/* Perk Name */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Perk Name</label>
            <input
              type="text"
              name="perkName"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.perkName}
            />
            {formik.touched.perkName && formik.errors.perkName && (
              <div className="text-red-500">{formik.errors.perkName}</div>
            )}
          </div>

          {/* Type Dropdown */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Perk Type</label>
            <select
              name="selectedType"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.selectedType}
            >
              <option value="">Select Type</option>
              {formik.values.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formik.touched.selectedType && formik.errors.selectedType && (
              <div className="text-red-500">{formik.errors.selectedType}</div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Category</label>
            <select
              name="selectedCategory"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.selectedCategory}
            >
              <option value="">Select Category</option>
              {formik.values.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formik.touched.selectedCategory && formik.errors.selectedCategory && (
              <div className="text-red-500">{formik.errors.selectedCategory}</div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {/* Asset Address */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Asset Address</label>
            <input
              type="text"
              name="assetAddress"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.assetAddress}
            />
            {formik.touched.assetAddress && formik.errors.assetAddress && (
              <div className="text-red-500">{formik.errors.assetAddress}</div>
            )}
          </div>

          {/* Factory Address */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Factory Address</label>
            <input
              type="text"
              name="factoryAddress"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.factoryAddress}
            />
            {formik.touched.factoryAddress && formik.errors.factoryAddress && (
              <div className="text-red-500">{formik.errors.factoryAddress}</div>
            )}
          </div>

          {/* Search Text */}
          <div className="mb-6">
            <label className="block text-base font-medium text-white mb-2">Search Text</label>
            <input
              type="text"
              name="searchText"
              className="input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.searchText}
            />
            {formik.touched.searchText && formik.errors.searchText && (
              <div className="text-red-500">{formik.errors.searchText}</div>
            )}
          </div>
        </div>
    </div>
    </div>  
     {/* Submit Button */}
     <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className=""
        >
          Submit
        </button>
      </div> 
    </>
  );
};

export default SearchForm;
