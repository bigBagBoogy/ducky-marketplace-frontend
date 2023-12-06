// pages/admin.tsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';


const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Admin: React.FC = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center mt-28">
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="max-w-md">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white-600">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="input mt-1 p-2 w-full border rounded-md"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white-600">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="input mt-1 p-2 w-full border rounded-md"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="mt-4"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  </div>
  </>
  );
};

export default Admin;
