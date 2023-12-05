// SearchForm.tsx
import React from 'react';
import { useFormikContext } from 'formik';
import * as Yup from 'yup';


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
    // console.log('formik:', formik);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Checkbox */}
      <div className="mb-2">
        <div className="relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isChecked"
              className="mr-2 custom-checkbox"
              checked={formik.values.isChecked}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="isChecked" className="text-md font-medium text-white">
              Redeemable
            </label>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-3xl mx-auto text-center">
        {/* Perk Name */}
        <div className="mb-6">
          <label className="block text-base font-medium text-white mb-2">Perk Name</label>
          <input
            type="text"
            name="perkName"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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

        {/* Asset Address */}
        <div className="mb-6">
          <label className="block text-base font-medium text-white mb-2">Asset Address</label>
          <input
            type="text"
            name="assetAddress"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.searchText}
          />
          {formik.touched.searchText && formik.errors.searchText && (
            <div className="text-red-500">{formik.errors.searchText}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="border-4 border-aqua-500 hover:border-green-500 text-aqua-500 hover:text-green-500 px-6 py-3 rounded-md text-base"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;