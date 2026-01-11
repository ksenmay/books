import { create } from 'zustand';
import type { ProfileState } from '../types/profileState';

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile }),

  updateProfile: (data) => {
    set((state) => {
      if (!state.profile) return { profile: null };

      const newProfile =
        typeof data === 'function'
          ? data(state.profile)
          : { ...state.profile, ...data };

      return { profile: newProfile };
    });
  },

  updateAvatar: (avatar) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, avatar }
        : null,
    })),

  clearProfile: () => set({ profile: null }),
}));
