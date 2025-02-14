import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function PinInput({ length = 6, onComplete }) {
  const [pin, setPin] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError("");

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newPin.join("").length === length) {
      onComplete && onComplete(newPin.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const enteredPin = pin.join("");
    if (enteredPin === "171004") {
      localStorage.setItem("UserName", "Namee");
      alert("Login Successful!");
      navigate("/"); // Redirect to home page
    } else if (enteredPin === "315803") {
      localStorage.setItem("UserName", "Subodh");
      alert("Login Successful!");
      navigate("/"); // Redirect to home page
    } else {
      setError("Incorrect PIN. Try again.");
      setPin(Array(length).fill(""));
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="pin-container">
      <h2>Enter Your PIN</h2>
      <div className="pin-inputs">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="tel"
            maxLength="1"
            className="pin-box"
            inputMode="numeric"
            pattern="[0-9]*"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={pin.join("").length < length}
      >
        Submit
      </button>
    </div>
  );
}
