import { create } from "zustand";
import axios from "axios";

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
  books: Book[];
  book: Book | null;
  library_id: number;
  setBooks: (books: Book[]) => void;
  setBook: (book: Book) => void;
  fetchBooks: () => Promise<void>;
  fetchBook: (id: number) => Promise<void>;
  createBook: (book: Book) => Promise<void>;
  getCurrentBook: () => Book | null;
};

const useBookStore = create<BookState>((set, get) => ({
  books: [],
  book: null,
  library_id: 0,
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
    try {
      const response = await axios.post(`${baseUrl}/create`, book);
      set((state) => ({ books: [...state.books, response.data.book] }));
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  },

  getCurrentBook: () => get().book,
}));

export default useBookStore;
