import { create } from 'zustand';
import axios from 'axios';

const baseUrl = "http://localhost:3000/api/book";

type Book = {
  id: string;
  author: string;
  title: string;
  created_at: string;
  updated_at: string;
  library_id: number;
  owner_id: number;
};

type BookState = {
  book: Book | null;
  library_id: number;
  setBook: (book: Book) => void;
  getCurrentBook: () => Book | null;
  getBooks: (id: number) => Promise<void>;
  createBook: (book: Book) => void;
  /*
    loadBookFromStorage: () => void;
    getBooks: () => Promise<void>;
  */
};

const useBookStore = create<BookState>((set) => ({
  book: null,
  library_id: 0,
  setBook: (book) => set({ book }),
  getCurrentBook: (): Book | null => { 
    return useBookStore((state) => state.book);
  },
  getBooks: async (bookId) => {
    let bookRoute = baseUrl;
    if(bookId > 1) {
      bookRoute += `/${bookId}`;
    };
    const response = await axios.get(bookRoute);
    try {
      set(response.data.book);
      // set({ book, isAuthenticated: true });
      // localStorage.setItem('token', token);
      // localStorage.setItem('email', email);
      // window.location.href = '/books';
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  createBook: async (book) => {
    return await axios.post(`${baseUrl}/create`, book);
  },
  /*
    loadBookFromStorage: () => {
      const token = localStorage.getItem('token');
      return localStorage.getItem('book');
    },
    clearBook: () => {
      localStorage.removeItem('token');
      set({ book: null, isAuthenticated: false });
    },
  */
}));

export default useBookStore;

