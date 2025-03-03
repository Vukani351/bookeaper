type Book = {
  id?: string;
  title: string;
  author: string;
  description?: string;
  status: "available" | "borrowed";
  borrower?: string; // Name of the person who borrowed it
  borrowedDate?: string;
  thumbnail?: string;
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
  editBook: (book: Book) => Promise<void>;
  getCurrentBook: () => Book | null;
  searchBookDetails:(searchQuery: string) => Promise<any>;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loadUserFromStorage: () => any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  getProfile: (userId: string) => Promise<any>;
  updateUser: (userData: any) => Promise<any>;
};

type User = {
    id?: string;
    username: string;
    email: string;
    token?: string;
};

type Library = {
  id: string;
  name: string;
  description: string;
  user_id: number;
};

export type { User, AuthState, BookState, Book, Library };