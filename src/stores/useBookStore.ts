import { create } from "zustand";
import axios from "axios";
import { BookState } from "../types/storeState";

const baseUrl = "http://localhost:3000/book";
/*
* TODO:
* ADD FUNCTION TO GET THIS GUY ${JSON.parse(localStorage.getItem('auth-storage')!)?.state?.user?.token}
* */
const useBookStore = create<BookState>((set, get) => ({
  books: [],
  book: null,
  owner_id: 1,
  library_id: 1,
  setBooks: (books) => set({ books }),
  setBook: (book) => set({ book }),

  fetchBooks: async () => {
    try {
      const response = await axios.get(`${baseUrl}/library/${get().library_id}`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth-storage')!)?.state?.user?.token}`,
          "Content-Type": "application/json",
        },
      });
      set({ books: response.data }); // Store book list
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  },

  fetchBook: async (bookId) => {
    try {
      const response = await axios.get(`${baseUrl}/${bookId}`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth-storage')!)?.state?.user?.token}`,
          "Content-Type": "application/json",
        },
      });
      set({ book: response.data });
    } catch (error) {
      console.error("Failed to fetch book:", error);
    }
  },

  createBook: async (book) => {
    
    try {
      book.library_id = get().library_id ?? 1;
      book.owner_id = get().book?.owner_id ?? 1;
      const response = await axios.post(`${baseUrl}/new`, book, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-storage')!)?.state?.user?.token}`,
        }
      });
      set((state) => ({ books: [...state.books, response.data.book] }));
      window.location.href = '/library';
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  },

  editBook: async (book) => {
    try {
      const response = await axios.put(`${baseUrl}/${book.id}`, {...book}, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth-storage')!)?.state?.user?.token}`,
          "Content-Type": "application/json",
        }});
      set((state) => ({ books: [...state.books, response.data.book] }));
      window.location.href = '/library';
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
