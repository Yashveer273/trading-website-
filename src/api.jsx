import axios from "axios";

const API_BASE_URL = "http://localhost:5004/"; // Backend URL

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

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}api/users/login`, credentials);
    return res.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};
export  const SECRET_KEY = "your_secret_key_here";

export const fetchLuckySpinPrizes = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}api/luckySpin/items`); // Adjust your API route
    const data = await res.json();

    const mappedPrizes = data.map((item) => ({
      name: item.itemName,
      value: item.reward,
      image: `http://localhost:5004${item.imageUrl}`,
    }));

    return mappedPrizes;
  } catch (err) {
    console.error("Failed to fetch prizes:", err);
    return {};
  }
};
export const spinItem = async () => {
  const data = await fetch(`${API_BASE_URL}api/luckySpin/spinItem`);
  return data;
};
export const productGet = async () => {
  const data = await fetch(`${API_BASE_URL}api/products`);
  return data;
};
export const QRrandom = async () => {
  const data = await fetch(`${API_BASE_URL}QR/api/qr/random`);
  return data;
};


export const BuyProduct = async (payload) => {

 
    const res = await axios.post(`${API_BASE_URL}QR/api/payments`, payload);
    console.log(res);
    return res;
  
};

export const RechargeBalence = async (payload) => {

 
    const res = await axios.post(`${API_BASE_URL}QR/api/recharge`, payload);
    console.log(res);
    return res;
  
};

export const GetBankDetails = async (userId) => {

 const res= await axios.get(`${API_BASE_URL}api/withdraw/bank`,{params:{userId}});
 
 return res;
}

export const addBankDetails = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE_URL}api/withdraw/bank-details`, payload);
    return res.data;
  } catch (err) {
    console.error("Add Bank Details Error:", err);
    throw err.response?.data || err;
  }
};

export const updateBankDetails = async ( payload) => {
  try {
    const res = await axios.put(`${API_BASE_URL}api/withdraw/bank-details/${payload.userId}`, payload);
    return res;
  } catch (err) {
    console.error("Update Bank Details Error:", err);
    throw err.response?.data || err;
  }
};

export const withdrawReq = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE_URL}api/withdraw`, payload);
    return res;
  } catch (err) {
    console.error("Add Bank Details Error:", err);
    throw err.response?.data || err;
  }
};
export const getUserInfo = async (userId) => {

 const res= await axios.get(`${API_BASE_URL}api/users/user`,{params:{userId}});
 
 return res;
}