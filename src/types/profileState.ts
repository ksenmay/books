import type { Profile } from "./profile";

export type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (data: Partial<Profile> | ((prev: Profile) => Profile)) => void;
  updateAvatar: (avatar: string) => void;
  clearProfile: () => void;
};