import { create } from 'zustand';
import { getItem, setItem, removeItem } from '../utils/storage';
import { currentUser } from '../data/users';

// Mock authentication — abstracted behind this store so a real backend
// (REST/GraphQL/Supabase/Firebase) can be swapped in without touching UI code.
export const useAuthStore = create((set) => ({
  isAuthenticated: getItem('isAuthenticated', true),
  isLocked: getItem('isLocked', false),
  user: getItem('authUser', currentUser),
  login: (email) => {
    const user = { ...currentUser, email: email || currentUser.email };
    setItem('isAuthenticated', true);
    setItem('isLocked', false);
    setItem('authUser', user);
    set({ isAuthenticated: true, isLocked: false, user });
  },
  logout: () => {
    removeItem('isAuthenticated');
    removeItem('isLocked');
    set({ isAuthenticated: false, isLocked: false });
  },
  lock: () => {
    setItem('isLocked', true);
    set({ isLocked: true });
  },
  unlock: () => {
    setItem('isLocked', false);
    set({ isLocked: false });
  },
}));
