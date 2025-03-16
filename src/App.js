import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "../src/pages/Upload";
import Gallery from "../src/pages/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
