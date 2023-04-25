import React, { useState, useCallback, useImperativeHandle } from "react";
import Cropper from "react-easy-crop";
import "./ImageUploadBox.css";
import axios from "axios";
import BounceLoader  from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";

const ImageUploadBox = React.forwardRef((props, ref) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  console.log("croppedAreaPixels: ", croppedAreaPixels);
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const navigate = useNavigate();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async (croppedAreaPixels) => {
    const image = await loadImage(props.image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Không thể chuyển đổi canvas thành Blob"));
        }
      }, "image/png");
    });
  };

  // const blobToString = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(blob);
  //   });
  // }
  const handleShare = async () => {
    console.log("hi: ");
    const croppedImageBlob = await getCroppedImage(croppedAreaPixels);
    console.log("croppedImageBlob: ", croppedImageBlob);

    // đẩy hình ảnh đã cắt lên cơ sở dữ liệu.
    // Chuyển đổi Blob thành File
    const croppedImageFile = new File([croppedImageBlob], "croppedImage.png", {
      type: "image/png",
    });

    // Tạo FormData và thêm tệp ảnh

    const formData = new FormData();
    formData.append("user", props.currentUser._id);
    formData.append("image", croppedImageFile);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setUploading(true);
      await axios.post(
        "http://localhost:8000/api/v1/stories/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setMessage("Ảnh đã được tải lên thành công!");
      setUploading(false);
      setIsUploaded(true);
      navigate("/");
      // setSuccess(true);
    } catch (error) {
      console.error("Lỗi khi tải hình ảnh:", error);
      console.log("Cropped image as File:", croppedImageFile);
      // setMessage("Lỗi trong quá trình tải ảnh lên");
      setUploading(false);
      // setSuccess(false);
    }
    console.log("Cropped image as Blob:", croppedImageBlob);
  };

  useImperativeHandle(ref, () => ({
    handleShare,
    addTextToImage,
  }));
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });
  };
  const addTextToImage = () => {};

  return (
    <div className="container">
      {uploading && (
        <div>
          <div className="overlay"></div>
          <div className="loading-overlay">
            <BounceLoader color="#0C88EF" loading={uploading} size={150} />
          </div>
        </div>
      )}
      <div className="content">
        <div className="wrapper">
          <h1 className="title">Xem trước</h1>
          <div className="crop-container">
            <Cropper
              id="Cropper"
              image={props.image}
              crop={crop}
              zoom={zoom}
              aspect={9 / 16}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="controls">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
export default ImageUploadBox;
