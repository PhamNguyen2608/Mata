import React, { useState, useRef } from "react";
import ImageUploadBox from "./ImageUploadBox";
import "./AddStoryPage.css";
import { useSelector } from "react-redux";
import axios from "axios";
const AddStoryPage = (props) => {
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUploadBoxRef = useRef();
  const currentUser = useSelector((state) => state.user.userinfo);
  // console.log("currentUser", currentUser);
  const fullname = currentUser.first_name.concat(" ", currentUser.last_name);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match(/^image\//)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setImageLoaded(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCloseCropper = () => {
    alert("Changes you made may not be saved.");
    setImageLoaded(false);
  };
  const handleButtonClick = () => {
    imageUploadBoxRef.current.handleShare();
  };
  return (
    <div className="container">
      <div className="nav">
        <div className="avatar-container">
          {imageLoaded && (
            <div className="close-icon" onClick={handleCloseCropper}></div>
          )}
          <h1>Your Story</h1>
          <div className="infor">
            <div className="avatar">
              <img src={currentUser.photo} alt={currentUser.photo} />
            </div>
            <span className="name">{fullname}</span>
          </div>
        </div>
        {imageLoaded && (
          <div>
            <div className="button-add">
              <hr className="horizontalLine" />
              <div className="add">
                <div className="iconWrapper">
                  <div className="circle"></div>
                  <div className="textIcon">Aa</div>
                </div>

                <button className="addText" >
                  Add text
                </button>
              </div>
            </div>
            <div className="submit">
              <button className="my-button" onClick={handleButtonClick}>
                Share to story
              </button>
            </div>
          </div>
        )}
      </div>

      {!imageLoaded ? (
        <>
          <div className="upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="imageInput"
            />
            <label htmlFor="imageInput" className="upload-button">
              <div className="icon-upload">
                <div className="arrow-up"></div>
                <div className="horizontal-line"></div>
              </div>
              <div className="upload-text">Create Your Story</div>
            </label>
          </div>
        </>
      ) : (
        <ImageUploadBox
          image={image}
          onClose={handleCloseCropper}
          ref={imageUploadBoxRef}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default AddStoryPage;
