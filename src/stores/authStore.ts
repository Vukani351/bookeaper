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
    if (token) {
      // Optional: Fetch user details with the token
      // Simulating user retrieval for this example
      set({ user: { id: '1', username: 'JohnDoe', email: 'john@example.com' }, isAuthenticated: true });
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const { user, token } = response.data;
      set({ user, isAuthenticated: true });
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
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
