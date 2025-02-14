import React, { useState, useEffect, useRef } from "react";
import { getFileLines, addLineToFile, deleteLineFromFile } from "../api";

export default function Test() {
  const [fileName, setFileName] = useState("Complaints");
  const [user, setUser] = useState(() => localStorage.getItem("UserName"));
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState("");
  const chatEndRef = useRef(null);


  useEffect(() => {
    fetchLines();
    setUser(localStorage.getItem("UserName"));
  }, [fileName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const fetchLines = async () => {
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

  return (
    <div className="chatContainer">
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
              <button id="cross" onClick={() => handleDeleteLine(index)}>X</button>
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
        <button className="beautifulButton" onClick={handleAddLine}>
          ➤
        </button>
      </div>
    </div>
  );
}
