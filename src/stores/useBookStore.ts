import { create } from "zustand";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/book";

type Book = {
  id: number;
  author: string;
  title: string;
  created_at: string;
  updated_at: string;
  library_id: number;
  owner_id: number;
};

export type BookState = {
  books: Book[];
  book: Book | null;
  owner_id: 1,
  library_id: number;
  setBooks: (books: Book[]) => void;
  setBook: (book: Book) => void;
  // getToken: () => void;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: number) => Promise<void>;
  createBook: (book: Book) => Promise<void>;
  editBook: (book: Book) => Promise<void>;
  getCurrentBook: () => Book | null;
  searchBookDetails:(searchQuery: string) => Promise<any>;
};

const useBookStore = create<BookState>((set, get) => ({
  books: [],
  book: null,
  owner_id: 1,
  library_id: 1,
  setBooks: (books) => set({ books }),
  setBook: (book) => set({ book }),

  fetchBooks: async () => {
    try {
      const response = await axios.get(baseUrl);
      set({ books: response.data }); // Store book list
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  },

  fetchBook: async (bookId) => {
    try {
      const response = await axios.get(`${baseUrl}/${bookId}`);
      set({ book: response.data });
    } catch (error) {
      console.error("Failed to fetch book:", error);
    }
  },

  createBook: async (book) => {
    book.owner_id = get().owner_id;
    book.library_id = get().library_id;
    try {
      const response = await axios.post(`${baseUrl}/create`, book, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      set((state) => ({ books: [...state.books, response.data.book] }));
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  },

  editBook: async (book) => {
    get
    try {
      const response = await axios.put(`${baseUrl}/update`, book, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
      });
      console.log("edited book: ", response);
      set((state) => ({ books: [...state.books, response.data.book] }));
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  },

  getCurrentBook: () => get().book,

  searchBookDetails: async (query: string) => {
    /* fix this to be clean code. */
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyD5sE9FjQkV6tp7MvsuC0iVQgYYMRjOUPA`
      );

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      return [];
    }
  },
}));

export default useBookStore;
