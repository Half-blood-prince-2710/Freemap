
import {
  createContext,
  useContext,
    useState,
  useEffect

} from "react";
import { AuthContextType, User } from "../types/types";


const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("map-user");
    if (storedUser) {
      try {
        const parsedUser: User =
          JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Error parsing stored user data:",
          error
        );
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};