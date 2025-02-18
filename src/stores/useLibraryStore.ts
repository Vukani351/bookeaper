import { create } from "zustand";
import axios from "axios";
import { Book, Library } from "../types/storeState";


const baseUrl = "http://localhost:3000/api/library";

type LibraryState = {
  libraries: Library[];
  currentLibrary: Library;
  selectedLibraryId: string | null;
  addLibrary: (name: string) => void;
  fetchLibraryDetails: (libraryId: string) => Promise<Library | undefined>;
  editLibrary: (updatedLibrary: Library) => void;
  deleteBook: (libraryId: string, bookId: string) => void;
  borrowBook: (libraryId: string, bookId: string, borrower: string) => void;
  returnBook: (libraryId: string, bookId: string) => void;
  selectLibrary: (libraryId: string) => void;
};

export const useLibraryStore = create<LibraryState>((set) => ({
  libraries: [],
  selectedLibraryId: null,
  currentLibrary: {
    id: "", name: "",
    description: "",
    user_id: 0
  },

  addLibrary: (name) => set((state) => ({
    libraries: [...state.libraries, { id: Date.now().toString(), name, description: "", user_id: 1 }]
  })),

  editLibrary: async (updatedLibrary) => {
    try {
      const response = await axios.put(`${baseUrl}/edit`, updatedLibrary, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('auth-storage')!).state?.user?.token}`,
        }
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch library details:", error);
      return error;
    }
  },

  deleteBook: (libraryId, bookId) => set((state) => ({
    
  })),

  borrowBook: (libraryId, bookId, borrower) => set((state) => ({
   
  })),

  returnBook: (libraryId, bookId) => set((state) => ({
    
  })),

  selectLibrary: (libraryId) => set(() => ({ selectedLibraryId: libraryId })),

  fetchLibraryDetails: async (libraryId) => {
    try {
      const response = await axios.get(`${baseUrl}/${libraryId}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('auth-storage')!).state?.user?.token}`,
        }
      });
      set({ currentLibrary: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch library details:", error);
      return undefined;
    }
  },
}));

