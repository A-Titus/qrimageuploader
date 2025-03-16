import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import backgroundImage from "../images/background.jpeg";

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(${backgroundImage}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-family: "Great Vibes", cursive;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Names = styled.h1`
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Date = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 12px 20px;
  background: #b76e79;
  color: white;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #944c57;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1.2rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const Upload = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (images.length === 0) return;
    setUploading(true);

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "weddingPics");
      formData.append("cloud_name", "dtizxy5eh");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtizxy5eh/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.public_id;

        await addDoc(collection(db, "images"), {
          url: imageUrl,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }
    alert("Images uploaded successfully!");
    setUploading(false);
    setImages([]);
  };

  return (
    <Background>
      <Overlay />
      <Content>
        <Names>Abdus-Samad & Cherezaan</Names>
        <Date>April 19, 2025</Date>
        <UploadButton>
          Select Photos
          <HiddenInput
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </UploadButton>
        <br />

        <br />
        <Link to="/gallery">
          <Button>View Gallery</Button>
        </Link>
      </Content>
    </Background>
  );
};

export default Upload;
