import { create } from "zustand";

type Book = {
  id: string;
  title: string;
  author: string;
  status: "available" | "borrowed";
  borrower?: string; // Name of the person who borrowed it
  borrowedDate?: string;
};

type Library = {
  id: string;
  name: string;
  books: Book[];
};

type LibraryState = {
  libraries: Library[];
  selectedLibraryId: string | null;
  addLibrary: (name: string) => void;
  getLibraryDetails: (name: string) => void;
  addBook: (libraryId: string, book: Book) => void;
  editBook: (libraryId: string, bookId: string, updatedBook: Partial<Book>) => void;
  deleteBook: (libraryId: string, bookId: string) => void;
  borrowBook: (libraryId: string, bookId: string, borrower: string) => void;
  returnBook: (libraryId: string, bookId: string) => void;
  selectLibrary: (libraryId: string) => void;
};

export const useLibraryStore = create<LibraryState>((set) => ({
  libraries: [],
  selectedLibraryId: null,
  
  addLibrary: (name) => set((state) => ({
    libraries: [...state.libraries, { id: Date.now().toString(), name, books: [] }]
  })),

  addBook: (libraryId, book) => set((state) => ({
    libraries: state.libraries.map(library =>
      library.id === libraryId ? { ...library, books: [...library.books, book] } : library
    )
  })),

  editBook: (libraryId, bookId, updatedBook) => set((state) => ({
    libraries: state.libraries.map(library =>
      library.id === libraryId
        ? {
            ...library,
            books: library.books.map(book =>
              book.id === bookId ? { ...book, ...updatedBook } : book
            )
          }
        : library
    )
  })),

  deleteBook: (libraryId, bookId) => set((state) => ({
    libraries: state.libraries.map(library =>
      library.id === libraryId
        ? { ...library, books: library.books.filter(book => book.id !== bookId) }
        : library
    )
  })),

  borrowBook: (libraryId, bookId, borrower) => set((state) => ({
    libraries: state.libraries.map(library =>
      library.id === libraryId
        ? {
            ...library,
            books: library.books.map(book =>
              book.id === bookId
                ? { ...book, status: "borrowed", borrower, borrowedDate: new Date().toISOString() }
                : book
            )
          }
        : library
    )
  })),

  returnBook: (libraryId, bookId) => set((state) => ({
    libraries: state.libraries.map(library =>
      library.id === libraryId
        ? {
            ...library,
            books: library.books.map(book =>
              book.id === bookId ? { ...book, status: "available", borrower: undefined, borrowedDate: undefined } : book
            )
          }
        : library
    )
  })),

  selectLibrary: (libraryId) => set(() => ({ selectedLibraryId: libraryId })),
}));
