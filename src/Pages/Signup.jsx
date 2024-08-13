import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    techStack: '',
    profilePhoto: null,
    email: '',
    password: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePhoto: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, college, techStack, profilePhoto, email, password, bio } = formData;

    if (!email || !password || (name && (!college || !techStack))) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be at least 8 characters long.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Create FormData object for file upload
    const data = new FormData();
    data.append('name', name);
    data.append('college', college);
    data.append('techStack', techStack);
    data.append('profilePhoto', profilePhoto); // This will be null if no file is selected
    data.append('email', email);
    data.append('password', password);
    data.append('bio', bio);

    try {
      const response = await axios.post(`http://localhost:4000/api/users/signup`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const responseData = response.data;

      if (responseData.success) {
        localStorage.clear();
        localStorage.setItem('auth-token', responseData.token);

        Swal.fire({
          title: 'Success!',
          text: 'You have successfully signed up!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setFormData({
            name: '',
            college: '',
            techStack: '',
            profilePhoto: null,
            email: '',
            password: '',
            bio: ''
          });
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: responseData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.log({ error: 'occur in frontend', details: error });
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="college" className="block text-sm font-medium text-gray-700">College:</label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack:</label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile Photo:</label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
