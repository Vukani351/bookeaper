import { create } from 'zustand';
import { persist, devtools, createJSONStorage  } from 'zustand/middleware';
import axios from 'axios';
import { AuthState } from '../types/storeState';

const baseUrl = "http://localhost:3000/api/user";

const useAuthStore = create<AuthState>()(
  persist(
  (set, get) => ({
  user: null,
  isAuthenticated: false,

  loadUserFromStorage: () => {
    return get().user;
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const { token, username, id } = response.data.user; // should get more data than this so we load books, library data n sht.
      set({ isAuthenticated: true });
      set({ user: { email: email, id: id, username: username, token: token } });
    } catch (error) {
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
      const response = await axios.post(`${baseUrl}/create`, { name: username, email: email, password: password });
      const { token, id, name } = response.data.user;
      set({ isAuthenticated: true });
      set({ user: { email: email, id: id, username: name, token: token } });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

}),
{
  name: "auth-storage",
  storage: createJSONStorage(() => sessionStorage),
}));

// persist the created state
persist(useAuthStore, {name: "basket"})
devtools(useAuthStore);
export default useAuthStore;
