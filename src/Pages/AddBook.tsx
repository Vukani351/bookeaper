import Button from '@mui/material/Button';
import React, { useState } from 'react';

const fetchBookDetails = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle&key=AIzaSyD5sE9FjQkV6tp7MvsuC0iVQgYYMRjOUPA`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Failed to fetch book details:", error);
    return [];
  }
};

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const results = await fetchBookDetails(query);
    setBooks(results);
  };

  const addItem = (index: number) => () => {
    console.log("Adding item to cart...", index);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for authors"
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
        Search
      </button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg">
            <img
              className="h-11/12 rounded w-full object-cover object-center mb-6"
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt="content"
            />
            <h1 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
              title: {book.volumeInfo.title}
            </h1>
            <h3 className="text-lg text-gray-900 font-medium title-font mb-4">
            subtitle: {book.volumeInfo.subtitle}
            </h3>
            <p className="leading-relaxed text-base">
                published Date: {book.volumeInfo.publishedDate}
            </p>
            <p className="leading-relaxed text-base">
              Work Count: {book.volumeInfo.work_count}
            </p>
            <p className="leading-relaxed text-base">
              Top Subjects:
            </p>
            <p className="leading-relaxed text-base">
              Alternate Names:
            </p>
            <p>{book.volumeInfo.authors}</p>
            <Button color="secondary" onClick={addItem(index)}>Add Item</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBook;
