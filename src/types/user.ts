export type Role = 'admin' | 'user';

export type User = { 
  id: string; 
  username: string; 
  email: string; 
  lastName: string; 
  firstName?: string; 
  middleName?: string; 
  fullName: string; 
  role: Role; city?: 
  string; avatarUrl?: 
  string; 
  createdAt: string; 

  profileData: { 
    avatar?: string; 
    country?: string; 
    city?: string; 
    fullName?: string;  
    firstName?: string;
    lastName?: string;
    middleName?: string;
  }
};