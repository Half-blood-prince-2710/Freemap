import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] =
    useState(false);
  const { setUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        "/api/v1/auth/logout"
      );
      // console.log(data)
      if (data.data.error) {
        throw new Error(
          data.data.error
        );
      }

      localStorage.removeItem(
        "map-user"
      );
      setUser(null);
      setLoading(false);
      toast.success(
        "Logout Successful"
      );
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        // Handle Axios error
        const errorMessage =
          e.response?.data?.message ||
          "An error occurred during logout";
        toast.error(errorMessage);
        console.error(
          "Axios error in useLogout:",
          errorMessage
        );
      } else if (e instanceof Error) {
        // Handle generic error
        toast.error(e.message);
        console.log(
          "Error in useLogout:",
          e.message
        );
      } else {
        console.error(
          "An unknown error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
