import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { LoginData, LoginResponse } from "../types/types";
import { MAX_LENGTH, MIN_LENGTH } from "../constants/constants";



const useLogin = () => {
  const [loading, setLoading] =
    useState(false);
  const { setUser } = useAuthContext();

  const login = async ({
    email,
    password,
  }: LoginData) => {
    const success = checkInputs({
      email,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response =
        await axios.post<LoginResponse>(
          "/api/v1/auth/login",
          {
            email,
            password,
          }
        );

      // console.log(
      //   "use login user data",
      //   response.data.data
      // );

      // Check for errors in the response
      if (response.data.error) {
        throw new Error(
          response.data.error
        );
      }

      // Store user data in local storage
      localStorage.setItem(
        "map-user",
        JSON.stringify(
          response.data.data.user
        )
      );

      // Set user state
      setUser(response.data.data.user); 

      toast.success("Login Successful");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        // Handle Axios error
        const errorMessage =
          e.response?.data?.message ||
          "An error occurred during login";
        toast.error(errorMessage);
        console.error(
          "Axios error in useLogin:",
          errorMessage
        );
      } else if (e instanceof Error) {
        // Handle generic error
        toast.error(e.message);
        console.log(
          "Error in useLogin:",
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

  return { loading, login };
};

const checkInputs = ({
  email,
  password,
}: LoginData) => {
  if (!email || !password) {
    toast.error(
      "Please fill in all fields"
    );
    return false;
  }
  if (password.length < MIN_LENGTH || password.length>MAX_LENGTH) {
    toast.error(
      "Password must be between than 6 to 16 characters"
    );
    return false;
  }
  return true;
};

export default useLogin;
