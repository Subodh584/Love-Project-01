import React, { useState, useEffect, useRef } from "react";
import { getFileLines, addLineToFile, deleteLineFromFile } from "../api";
import { useNavigate } from "react-router-dom";

export default function Chat({ fName }) {
  const [fileName, setFileName] = useState(fName); // Use fName directly
  const [user, setUser] = useState(() => localStorage.getItem("UserName"));
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    setFileName(fName); // Update fileName when fName changes
  }, [fName]);

  useEffect(() => {
    if (fileName) {
      fetchLines();
    }
    setUser(localStorage.getItem("UserName"));
  }, [fileName]); // Fetch lines when fileName updates

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const fetchLines = async () => {
    if (!fileName) return;
    const data = await getFileLines(fileName);
    setLines(data);
  };

  const handleAddLine = async () => {
    if (newLine.trim() === "") return;

    await addLineToFile(
      fileName,
      user === "Subodh" ? "#" + newLine : "@" + newLine
    );
    setNewLine("");
    fetchLines();
  };

  const handleDeleteLine = async (index) => {
    await deleteLineFromFile(fileName, index + 1);
    fetchLines();
  };

  const navigate = useNavigate();

  const handleBack = () => {
    // Add your logout logic here
    navigate('/'); // or wherever you want to redirect after logout
  };

  return fName === "Complaints" ? (
    <div className="chatContainer">
    <button className="logout-button" onClick={handleBack}>
        Back
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
        Complaints
      </h2>

      <ul className="complaintList">
        {lines.map((line, index) => (
          <li
            className={
              (user === "Subodh" && line.startsWith("#")) ||
              (user === "Namee" && line.startsWith("@"))
                ? "rightChat"
                : "leftChat"
            }
            key={index}
          >
            {line.charAt(1).toUpperCase() + line.slice(2)}{" "}
            {(user === "Subodh" && line.startsWith("#")) ||
            (user === "Namee" && line.startsWith("@")) ? (
              <button id="cross" onClick={() => handleDeleteLine(index)}>
                X
              </button>
            ) : null}
          </li>
        ))}
        <div ref={chatEndRef}></div>
      </ul>

      <div className="chatInputContainer">
        <input
          id="textField"
          type="text"
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="beautifulButton" onClick={handleAddLine}>➤</button>
      </div>
    </div>
  ) : (
    <div className="reasonsContainer">
    <button className="logout-button" onClick={handleBack}>
        Back
      </button>
      <h2 className="reasonsTitle">Reasons I Love You</h2>
      <div className="reasonsGrid">
        {lines.map((line, index) => (
          <div className="reasonCard" key={index}>
            <span className="reasonNumber">#{index + 1}</span>
            <p className="reasonText">{line.charAt(1).toUpperCase() + line.slice(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
