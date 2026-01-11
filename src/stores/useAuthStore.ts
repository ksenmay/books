import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user';
import type { AuthState } from '../types/authState';

const mockUsers: Array<User & { password: string; profileData?: any }> = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mail.com',
    lastName: 'Администратор',
    firstName: ' ',
    middleName: ' ',
    fullName: 'Администратор',
    role: 'admin',
    createdAt: new Date().toISOString(),
    password: 'admin123',
    profileData: { country: '', city: '', avatar: '' },
  },
  {
    id: '2',
    username: 'user',
    email: 'user@mail.com',
    lastName: 'Смертный',
    firstName: '',
    middleName: ' ',
    fullName: 'Смертный',
    role: 'user',
    createdAt: new Date().toISOString(),
    password: 'user1234',
    profileData: { country: '', city: '', avatar: '' },
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuth: false,
      users: mockUsers,

      isUsernameTaken: (username) =>
        get().users.some((u) => u.username === username),

      isEmailTaken: (email) =>
        get().users.some((u) => u.email === email),

      login: (username, password) => {
        const found = get().users.find(
          (u) => u.username === username && u.password === password
        );
        if (!found) return false;

        const { password: _, ...user } = found;
        set({ user, isAuth: true });
        return true;
      },

      register: (data) => {
        if (get().isUsernameTaken(data.username)) {
          return { ok: false, field: 'username' };
        }

        if (get().isEmailTaken(data.email)) {
          return { ok: false, field: 'email' };
        }

        const fullName = [
          data.lastName?.trim(),
          data.firstName?.trim(),
          data.middleName?.trim(),
        ].filter(Boolean).join(' ') || data.lastName?.trim() || data.username;

        const newUser: User & { password: string; profileData: any } = {
          id: crypto.randomUUID(),
          username: data.username,
          email: data.email,
          lastName: data.lastName,
          firstName: data.firstName || '',
          middleName: data.middleName || '',
          fullName,
          role: 'user',
          createdAt: new Date().toISOString(),
          password: data.password,
          profileData: { country: '', city: '', avatar: '' },
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: { ...newUser, password: undefined },
          isAuth: true,
        }));

        return { ok: true };
      },

      logout: () => set({ user: null, isAuth: false }),

      updateProfile: (data: Partial<User['profileData']>) => {
        const user = get().user;
        if (!user) return;

        const updatedProfile = { ...user.profileData, ...data };
        const updatedUser = { ...user, profileData: updatedProfile };

        set((state) => ({
          user: updatedUser,
          users: state.users.map((u) =>
            u.id === updatedUser.id ? { ...u, profileData: updatedProfile } : u
          ),
        }));
      },

    }),
    {
      name: 'auth-storage-v2',
      partialize: (state) => ({
        user: state.user,
        users: state.users,
      }),
    }
  )
);
