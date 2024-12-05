import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import {
  MAX_LENGTH,
  MIN_LENGTH,
} from "../constants/constants";

// Define the structure of the signup data
type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useSignup = () => {
  // State to manage loading status
  const [loading, setLoading] =
    useState<boolean>(false);
  const { setUser } = useAuthContext(); // Get the setUser  function from the AuthContext

  // Function to handle user signup
  const signup = async ({
    name,
    email,
    password,
    confirmPassword,
  }: SignupData) => {
    // Validate inputs before proceeding
    const success = checkInputs({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!success) return; // Exit if validation fails

    setLoading(true); // Set loading state to true
    try {
      // Make a POST request to the signup API
      const response = await axios.post(
        "https://freemap-9jtb.onrender.com/api/v1/auth/signup",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      // console.log(response.data.data); // Log the response data

      // Store user data in local storage
      localStorage.setItem(
        "map-user",
        JSON.stringify(
          response.data.data.user
        )
      );
      setUser(response.data.data.user); // Update user context with the new user data
      toast.success(
        "Account Created Successfully"
      ); // Show success message
    } catch (e: unknown) {
      // Handle errors
      if (e instanceof Error) {
        toast.error(e.message); // Show error message
        console.log(
          "Error in useSignup: ",
          e.message
        ); // Log the error
      } else {
        console.error(
          "An unknown error occurred"
        ); // Log unknown errors
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return {
    loading, // Return loading state
    signup, // Return signup function
  };
};

// Function to validate user inputs
function checkInputs({
  name,
  email,
  password,
  confirmPassword,
}: SignupData) {
  // Check for empty fields
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    toast.error(
      "Please fill in all fields"
    ); // Show error message
    return false; // Validation failed
  }

  // Validate name length
  if (
    name.length < MIN_LENGTH ||
    name.length > MAX_LENGTH
  ) {
    toast.error(
      "Name should be between 6 to 20 characters"
    ); // Show error message
    return false; // Validation failed
  }

  // Email validation regex
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
  if (!emailRegex.test(email)) {
    toast.error(
      "Please enter a valid email address"
    ); // Show error message
    return false; // Validation failed
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    toast.error(
      "Passwords do not match"
    ); // Show error message
    return false; // Validation failed
  }

  // Validate password length
  if (
    password.length < MIN_LENGTH ||
    password.length > MAX_LENGTH
  ) {
    toast.error(
      "Password must be between 6 to 20 characters"
    ); // Show error message
    return false; // Validation failed
  }

  return true; // All validations passed
}

export default useSignup; // Export the useSignup hook
