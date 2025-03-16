import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import styled from "styled-components";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #fffaf0, #ffe4e1);
  min-height: 100vh;
  font-family: "Great Vibes", cursive;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #b76e79;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
  padding: 10px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: "dtizxy5eh" } });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageList = querySnapshot.docs.map((doc) => doc.data().url);
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Container>
      <Title>Wedding Gallery 📸💖</Title>
      <Grid>
        {images.map((imageId, index) => {
          const img = cld.image(imageId).format("auto").quality("auto");
          return (
            <ImageWrapper key={index}>
              <AdvancedImage
                cldImg={img}
                style={{ borderRadius: "10px", maxWidth: "100%" }}
              />
            </ImageWrapper>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Gallery;
