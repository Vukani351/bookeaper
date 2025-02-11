import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import useBookStore from '../stores/useBookStore';

type Book = {
    id: number;
    author: string;
    title: string;
    created_at: string;
    updated_at: string;
    library_id: number;
    owner_id: number;
  };

function parseBook(raw_book: any): Book {
    return {
        id: 0,
        library_id: 0,
        owner_id: 0,
        author: raw_book.authors[0], // change this to be array, front end and back end
        title: raw_book.title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
}

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(true);
  const { 
    searchBookDetails,
    createBook
  } = useBookStore();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedDate: '',
    imageUrl: '',
  });

  const handleSearch = async () => {
    let results = [];
    results = await searchBookDetails(query);
    setBooks(results);
  };

  const addItem = (raw_book: any) => () => {
    const parsed_book = parseBook(raw_book);
    createBook(parsed_book);
  }

  // for the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      ...formData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      library_id: 0,
      owner_id: 0,
    };
    /* remove this when we take publishedDate & image url */
    const parsedBook = { 
        id: 0,
        owner_id: 0,
        library_id: 0,
        title: newBook.title,
        author: newBook.author,
        created_at: "",
        updated_at: ""
    }; 
    await createBook(parsedBook);
    // setFormData({
    //   title: '',
    //   author: '',
    //   publishedDate: '',
    //   imageUrl: '',
    // });
  };

  useEffect(() => {
    handleSearch();
    if(query === '') {
        setShowForm(true);
    } else {
        setShowForm(false);
    }
    }, [query])
  return (
    <div>
        <div className='flex justify-end w-full my-5'>
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
        </div> 
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book: {volumeInfo: any}, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg">
            <img
              className="h-11/12 rounded w-full object-cover object-center mb-6"
              src={book.volumeInfo?.imageLinks?.smallThumbnail}
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
            <Button color="secondary" onClick={addItem(book.volumeInfo)}>Add Item</Button>
          </div>
        ))}
      </div>
      {showForm && (<div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add Manually</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publishedDate" className="block text-gray-700 font-bold mb-2">
              Published Date
            </label>
            <input
              type="text"
              id="publishedDate"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Book
          </button>
        </form>
      </div>)}
    </div>
  );
};

export default AddBook;
