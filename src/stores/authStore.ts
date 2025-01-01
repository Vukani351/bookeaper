import { create } from 'zustand';
import axios from 'axios';

const baseUrl = "http://localhost:3000/api/user";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  loadUserFromStorage: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
  loadUserFromStorage: () => {
    const token = localStorage.getItem('token');
    if (!token) {
        set({ user: {username: '', email: '', id: '0'}, isAuthenticated: false });
        return;
    }
    return localStorage.getItem('user');

  },
  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const { user, token } = response.data; // should get more data than this so we load books, library data n sht.
      set({ user, isAuthenticated: true });
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      window.location.href = '/books';
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    set({ user: null, isAuthenticated: false });
  },
  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, { name: username, email: email, password: password });
      const { user, token } = response.data;
      set({ user, isAuthenticated: true });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
}));

export default useAuthStore;
