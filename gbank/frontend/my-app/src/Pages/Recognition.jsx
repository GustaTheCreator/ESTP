import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './Style/Recognition.css';

function Rekognition() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // Capture image using webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      console.log("Image Captured: ", imageSrc);
    }
  };

  // Handle image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result); // Base64 string of the image
        console.log("Image Uploaded: ", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to backend
  const uploadImage = () => {
    if (!imgSrc) {
      console.log("No image selected or captured!");
      return;
    }

    // Send the image to the backend for processing using fetch
    fetch('http://localhost:8000/api/rekognition/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ img: imgSrc }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        // Navigate to the Dashboard page
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      });
  };

  return (
    <div className="rekognition-container">
      <div className="camera-section">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <button className="capture-button" onClick={captureImage}>
          Capture Image
        </button>
      </div>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="image-input"
        />
        <button className="upload-button" onClick={uploadImage}>
          Upload Image
        </button>
      </div>

      {imgSrc && (
        <div className="preview-section">
          <h3>Preview:</h3>
          <img src={imgSrc} alt="Preview" className="image-preview" />
        </div>
      )}
    </div>
  );
}

export default Rekognition;