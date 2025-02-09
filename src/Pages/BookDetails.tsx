import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import tw from "tailwind-styled-components";
import useBookStore from '../stores/useBookStore';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
  
const ArticlesContainer = tw.div`container px-5 my-10 mx-auto animate__animated animate__bounceInUp`;
const IntroContainer = tw.div`flex flex-wrap w-full mb-20`;
const ArticlesBody = tw.div`flex flex-wrap -m-4`;

function BookDetails() {
  const { bookId } = useParams();
  const { fetchBook, book } = useBookStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    updated_at: '',
  });
  
  const handleEditClick = () => {
    setFormData({
      title: book?.title || 'not working',
      author: book?.author || 'not working',
      updated_at: book?.updated_at || 'not working',
    });

    console.log("Fetching book...", book, formData); // why it does not get formData
    setIsEditing(!isEditing);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving book details:', formData);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchBook(Number(bookId));
  }, [fetchBook]);

  return (
    <div>
      <ArticlesBody>
        {book ? (
          <div className="bg-gray-100 p-6 rounded-lg">
            <img className="h-40 rounded w-full object-cover object-center mb-6"
              src="https://dummyimage.com/720x400"
              alt="content"
            />
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
              {book.author}
            </h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
              {book.title}
            </h2>
            <p className="leading-relaxed text-base">
              {book.updated_at}
            </p>
            <span>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
            </ButtonGroup>
              
            </span>
            {isEditing && (
              <form className="mt-4">
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                {/* change this to be something important. */}
                <TextField
                  label="Updated At"
                  name="updated_at"
                  value={formData.updated_at}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </form>
            )}
          </div>
        ) : (
          <p>No books available.</p>
        )}
      </ArticlesBody>
    </div>
  );
}

export default BookDetails;
