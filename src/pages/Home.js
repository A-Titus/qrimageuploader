import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  margin-top: 10px;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
  }
`;

function Home() {
  return (
    <Container>
      <h1>Scan QR Code to Open</h1>
      <br />
      <Button to="/upload">Go to Upload</Button>
    </Container>
  );
}

export default Home;
