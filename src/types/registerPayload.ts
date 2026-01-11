export type RegisterPayload = {
  email: string;
  username: string;
  lastName: string;
  firstName?: string;
  middleName?: string;
  password: string;
};