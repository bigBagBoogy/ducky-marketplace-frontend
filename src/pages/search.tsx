// search.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchForm from '../components/SearchForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  selectedCategory: string;
  selectedType: string;
  isChecked: boolean;
  searchText: string;
  perkName: string;
  assetAddress: string;
  factoryAddress: string;  
}

const SearchPage = () => {
  const router = useRouter();

  const initialValues = {
    selectedCategory: '',
    selectedType: '',
    isChecked: false,
    searchText: '',
    perkName: '',
    assetAddress: '',
    factoryAddress: '',    
  };

  const handleSubmit = async (values: any) => {
    console.log('Searching with:', { values });
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });  
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }        
      const searchData = await response.json();  // Assuming the response is in JSON format
      console.log('returned BE searchData:', searchData);
      router.push({
        pathname: '/searchResults',
        query: { searchData }, // Pass the retrieved data to the search result page
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <Navbar />
      {/* Use the Formik component to wrap the SearchForm */}
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          // selectedCategory: Yup.string().required('Category is required'),
          // selectedType: Yup.string().required('Type is required'),
          searchText: Yup.string().required('Search text is required'),
          perkName: Yup.string().required('Perk Name is required'),
          assetAddress: Yup.string().required('Asset Address is required'),
          factoryAddress: Yup.string().required('Factory Address is required'),
        })}
        onSubmit={handleSubmit}
      >
        <SearchForm />
      </Formik>
    </>
  );
};

export default SearchPage;
