'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agree, setAgree] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError("You must agree to all terms!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Register Failed");
      }

      setSuccess(data.message || "Register successful!");

      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setError('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src="/illustration.png"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right form */}
        <div className="md:w-1/2 w-full p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Sign Up</h1>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* First Name */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fName"
              type="text"
              value={formData.fName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />

            {/* Last Name */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="lName"
              type="text"
              value={formData.lName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />

            {/* Username */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter Username"
            />

            {/* Email */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />

            {/* Password */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />

            {/* Confirm Password */}
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />

            {/* Agree checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">
                I agree to all terms
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
