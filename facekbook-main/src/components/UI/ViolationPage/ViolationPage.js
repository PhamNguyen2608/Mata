import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../UI/Lottie/6920-delayed-warning-icon.json";
import "./ViolationPage.css";
import { useNavigate } from "react-router-dom";

const ViolationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="violation-container">
      <div className="violation-animation">
        <Lottie
          animationData={animationData}
          style={{
            transform: "translateY(2px)",
            width: 300,
            height: 300,
            
          }}
          loop
          play
        />
      </div>
      <div className="violation-text">
        <h1>Oops! Something went wrong</h1>
        <p>
          Your post has violated our community guidelines, therefore we have
          deleted it. Please review the guidelines and try again later.
        </p>
      </div>
      <div
        className="btn_blue"
        style={{ maxWidth: "150px", marginTop: "10px" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Go to home
      </div>
    </div>
  );
};

export default ViolationPage;
