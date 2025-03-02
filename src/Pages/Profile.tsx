import React, { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';

const Profile: React.FC = () => {
  const { user, getProfile, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>("");

  // When user data is available, initialize form
  useEffect(() => {
    if (user && user.id) {
      // Call getProfile with the user id
      getProfile(user.id)
          .then((data) => {
          
          console.log('user ', data);
          setForm({
            name: data.name || '',
            email: data.email || '',
            address: data.address || '',
            password: '',
            confirmPassword: '',
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
        });
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Reset form to current user values  
    if (user) {
      /*
      setForm({
        username: user.username || '',
        email: user.email || '',
        address: user.address || '',
        password: '',
        confirmPassword: '',
      });
      */
    }
    setError("");
    setIsEditing(false);
  };

  const handleSave = () => {
    setError("");
    // Check password confirmation if password was changed
    if (form.password || form.confirmPassword) {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    // Here, you would typically call an update API endpoint.
    // For now, simply log the updated values.
      updateUser(form).then((data) => {
        setForm({
            name: data.name || '',
            email: data.email || '',
            address: data.address || '',
            password: '',
            confirmPassword: '',
          });
          setIsEditing(false);
      }).catch((err) => {
          console.error("Failed to update user profile:", err);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      {user ? (
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Name:</label>
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            ) : (
              <p className="text-gray-800">{user.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Email:</label>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            ) : (
              <p className="text-gray-800">{user.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Address:</label>
            {isEditing ? (
              <input 
                type="text" 
                name="address" 
                value={form.address} 
                onChange={handleChange} 
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            ) : (
              <p className="text-gray-800">{user.address || 'N/A'}</p>
            )}
          </div>
          {isEditing && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Password:</label>
                <input
                    autoComplete = "off" 
                    type="password" 
                    name="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Confirm Password:</label>
                <input
                    autoComplete = "off"
                    type="password" 
                    name="confirmPassword" 
                    value={form.confirmPassword} 
                    onChange={handleChange} 
                    className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
              </div>
            </>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-center space-x-4 mt-6">
            {!isEditing ? (
              <button 
                type="button" 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      ) : (
        <p className="text-center text-gray-600">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
