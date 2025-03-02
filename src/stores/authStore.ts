import { create } from 'zustand';
import { persist, devtools, createJSONStorage  } from 'zustand/middleware';
import axios from 'axios';
import { AuthState } from '../types/storeState';

const baseUrl = "http://localhost:3000/user";

const useAuthStore = create<AuthState>()(
  persist(
  (set, get) => ({
  user: null,
  isAuthenticated: false,

  loadUserFromStorage: () => {
    try {
      const storedData = localStorage.getItem("auth-storage");
      if (!storedData) return null;
      const parsed = JSON.parse(storedData);
      // The persisted data is stored in the "state" property
      return parsed.state?.user || null;
    } catch (error) {
      console.error("Failed to load user from storage:", error);
      return null;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const { token, name , id } = response.data; // should get more data than this so we load books, library data n sht.
      set({ isAuthenticated: true });
      set({ user: { email: email, username: name, token: token, id: id } });
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
  
  // New getProfile method to fetch user data based on userId
  getProfile: async (userId: string) => {
    const storedUser = get().loadUserFromStorage();
      
    try {
      const response = await axios.get(`${baseUrl}/${userId}`, {
        headers: {
          "Authorization": `Bearer ${storedUser?.token}`
        }
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userData: any) => {
    const storedUser = get().loadUserFromStorage();
    console.log("stored user: ", storedUser);
    try {
      const response = await axios.put(`${baseUrl}/${storedUser?.id}`, {...userData}, {
        headers: { "Authorization": `Bearer ${storedUser?.token}` }
      });

      const { email, name } = response.data;
      set({ user: { email: email, username: name } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}),
{
  name: "auth-storage",
  storage: createJSONStorage(() => localStorage),
}));

// persist the created state
persist(useAuthStore, {name: "basket"})
devtools(useAuthStore);
export default useAuthStore;
