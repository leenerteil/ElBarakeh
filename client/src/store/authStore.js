import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true,
        isAdmin: userData.role === 'admin'
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        isAdmin: false 
      }),
      
      register: (userData) => set({ 
        user: userData, 
        isAuthenticated: true,
        isAdmin: false 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);