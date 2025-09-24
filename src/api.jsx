import axios from "axios";

const API_BASE_URL = "http://localhost:5000/"; // Backend URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}api/users/register`, userData);
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};
