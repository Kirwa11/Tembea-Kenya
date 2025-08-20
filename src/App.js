// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; // Update the import path
import './App.css';

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Places from "./Pages/Places";
import Hotels from "./Pages/Hotels";
import CarHire from "./Pages/CarHire";
import Tourguide from "./Pages/Tourguide";
import Contact from "./Pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/places" element={<Places />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/car_hire" element={<CarHire />} />
              <Route path="/tourguide" element={<Tourguide />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;