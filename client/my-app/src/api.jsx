import axios from "axios";

// Dynamically set the API URL based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? "https://your-backend.onrender.com" // Empty string for same-domain requests in production
  : "http://localhost:5000";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ 1. GET - Fetch all lines from a file
export const getFileLines = async (fileName) => {
    try {
        const response = await api.get(`/get-lines/${fileName}`);
        return response.data.lines;
    } catch (error) {
        console.error("Error fetching file lines:", error);
        return [];
    }
};

// ✅ 2. POST - Add a new line to a file
export const addLineToFile = async (fileName, newLine) => {
    try {
        const response = await api.post(`/add-line/${fileName}`, { newLine });
        return response.data;
    } catch (error) {
        console.error("Error adding line:", error);
        return null;
    }
};

// ✅ 3. DELETE - Delete a specific line from a file
export const deleteLineFromFile = async (fileName, lineNumber) => {
    try {
        const response = await api.delete(`/delete-line/${fileName}/${lineNumber}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting line:", error);
        return null;
    }
};