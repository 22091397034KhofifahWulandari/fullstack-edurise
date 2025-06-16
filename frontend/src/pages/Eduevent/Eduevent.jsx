// src/pages/Eduevent/Eduevent.jsx
import React from 'react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 
import HeroSection from "../../components/eduevent/HeroSection";
import CompetitionSection from "../../components/eduevent/CompetitionSection";
import WebinarSection from "../../components/eduevent/WebinarSection";

const Eduevent = () => {
  return (
    <div>
      <Navbar /> {/* Menambahkan Navbar di sini */}
      <HeroSection />
      <CompetitionSection />
      <WebinarSection />
      <Footer /> {/* Menambahkan Footer di sini */}
    </div>
  );
};
export default Eduevent;
