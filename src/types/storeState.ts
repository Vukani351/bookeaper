type Book = {
  id: number;
  author: string;
  title: string;
  description?: string;
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
  // getToken: () => void;
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
};

type User = {
    id: string;
    username: string;
    email: string;
    token?: string;
};

export type { User, AuthState, BookState, Book };