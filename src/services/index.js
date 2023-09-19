import axios from "axios";
const baseURL = "http://localhost:3001"; 
const api = axios.create({
  baseURL,
});
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/user/addUser", userData);
    if (response.status === 201) {
      return {
        success: true,
        message: "Registration successful!",
      };
    } else {
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/user/login", userData);
    if (response.status === 200) {
      return {
        userData: response.data,
      };
    } else {
      return {
        message: "Login failed. Please check your credentials.",
      };
    }
  } catch (error) {
    return {
      message: "Login failed. Please check your credentials.",
    };
  }
};
