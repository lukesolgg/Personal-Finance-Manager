"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfileSettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
    profilePic: 'default.png',
  });
  const router = useRouter();

  const handleSave = () => {
    console.log('Saving:', userDetails);
    setIsEditing(false);
  };

  return (
    <div className="p-4 flex justify-center"> {/* Center the content horizontally */}
      <div className="max-w-lg w-full">
        <button 
          onClick={() => router.push('/')} 
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Profile Settings</h2>
        <div className="bg-white shadow rounded p-4 relative"> {/* Relative positioning for the save/edit button */}
          <div className="mb-4 flex items-center">
            <img 
              src={userDetails.profilePic} 
              alt="User's profile" 
              className="w-20 h-20 rounded-full mr-4 object-cover"
            />
            <div className="flex flex-col">
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input 
                type="file" 
                id="profilePic" 
                accept="image/*"
                className="mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <form className="flex flex-col space-y-4">
            {['username', 'email', 'password', 'newPassword', 'confirmPassword'].map((field) => (
              <div key={field} className="w-1/2">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}{field === 'password' && ' (Current)'}
                </label>
                <input 
                  type={field.includes('password') ? 'password' : 'text'}
                  id={field}
                  value={userDetails[field as keyof typeof userDetails]}
                  onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={!isEditing}
                  placeholder={
                    field === 'username' ? 'Enter your new username' :
                    field === 'email' ? 'Enter your new email address' :
                    field === 'password' ? 'Enter your current password' :
                    field === 'newPassword' ? 'Enter your new password' :
                    'Confirm your new password'
                  }
                />
              </div>
            ))}
          </form>
          
          {isEditing ? (
            <button 
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 absolute bottom-4 right-4"
            >
              Save Changes
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 absolute bottom-4 right-4"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;