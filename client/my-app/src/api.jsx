import axios from "axios";

const API_URL = "http://localhost:5000"; // Your backend server URL

// ✅ 1. GET - Fetch all lines from a file
export const getFileLines = async (fileName) => {
    try {
        const response = await axios.get(`${API_URL}/get-lines/${fileName}`);
        return response.data.lines; // Returns an array of lines
    } catch (error) {
        console.error("Error fetching file lines:", error);
        return [];
    }
};

// ✅ 2. POST - Add a new line to a file
export const addLineToFile = async (fileName, newLine) => {
    try {
        const response = await axios.post(`${API_URL}/add-line/${fileName}`, { newLine });
        return response.data;
    } catch (error) {
        console.error("Error adding line:", error);
        return null;
    }
};

// ✅ 3. DELETE - Delete a specific line from a file
export const deleteLineFromFile = async (fileName, lineNumber) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-line/${fileName}/${lineNumber}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting line:", error);
        return null;
    }
};
