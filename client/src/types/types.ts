// AuthContext
export type User = {
    id:string,
  name: string;
  email: string;
};
export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};


// useLogin
export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    user: User
  };
  error?: string; // Optional error field
}