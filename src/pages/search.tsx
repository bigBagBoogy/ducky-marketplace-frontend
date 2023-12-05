// search.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchForm from '../components/SearchForm';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
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
    categories: [],
    types: [],
  };

  const handleSubmit = (values: any) => {
    console.log('Searching with:', { values });

    // Use Next.js's router to navigate to the search result page
    router.push({
      pathname: '/searchResults', // Update with your actual search result page path
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      // selectedCategory: Yup.string().required('Category is required'),
      // selectedType: Yup.string().required('Type is required'),
      searchText: Yup.string().required('Search text is required'),
      perkName: Yup.string().required('Perk Name is required'),
      assetAddress: Yup.string().required('Asset Address is required'),
      factoryAddress: Yup.string().required('Factory Address is required'),
    }),
    onSubmit: handleSubmit,
  });

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
