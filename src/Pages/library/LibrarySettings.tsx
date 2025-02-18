import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useLibraryStore } from '../../stores/useLibraryStore';

const LibrarySettings = () => {
    // add these items correctly
  const [library, setLibrary] = useState({
    id: '1',
    name: 'John’s Public Library',
    description: 'A place to find and borrow books.',
    totalBooks: 250,
    availableBooks: 120, 
    loanedBooks: 10,
    visibility: true,
    lastUpdated: new Date().toLocaleString(),
    isEditing: false,
  });
  const { id } = useParams();
  const { editLibrary } = useLibraryStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      lastUpdated: new Date().toLocaleString(),
      isEditing: false,
    }));
    // Add logic to save the updated settings to the database
    editLibrary({id: library.id, name: library.name, description: library.description, user_id: 1}); // fix this later
  };

  const toggleEdit = () => {
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      isEditing: !prevLibrary.isEditing,
    }));
  };

  const { name, description, totalBooks, availableBooks, loanedBooks, visibility, lastUpdated, isEditing } = library;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Library Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="mb-2">{description}</p>
        <p>Total Books: {totalBooks}</p>
        <p>Books Available for Borrowing: {availableBooks}</p>
        <p>Books Loaned Out: {loanedBooks}</p>
        <p>Library Visibility Status: {visibility ? 'Public' : 'Private'}</p>
        <p>Last Updated: {lastUpdated}</p>
        <button onClick={toggleEdit} className="bg-blue-500 text-white p-2 rounded mt-4">
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Library Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalBooks" className="block text-gray-700 font-bold mb-2">
              Total Books
            </label>
            <input
              type="number"
              id="totalBooks"
              name="totalBooks"
              value={totalBooks}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="availableBooks" className="block text-gray-700 font-bold mb-2">
              Books Available for Borrowing
            </label>
            <input
              type="number"
              id="availableBooks"
              name="availableBooks"
              value={availableBooks}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loanedBooks" className="block text-gray-700 font-bold mb-2">
              Books Loaned Out
            </label>
            <input
              type="number"
              id="loanedBooks"
              name="loanedBooks"
              value={loanedBooks}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="visibility" className="block text-gray-700 font-bold mb-2">
              Library Visibility Status
            </label>
            <input
              type="checkbox"
              id="visibility"
              name="visibility"
              checked={visibility}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">{visibility ? 'Public' : 'Private'}</span>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
};

export default LibrarySettings;