import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import VideoPage from "./pages/Video";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ImageGallery from "./components/ImageGallery";
import VideoGallery from "./components/VideoGallery";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ImageGallery />} />
          {/* <Route path="/images" element={<ImageGallery />} /> */}
          <Route path="videos" element={<VideoGallery />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
