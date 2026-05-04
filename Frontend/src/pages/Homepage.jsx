import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import HomeHero from "../components/HomeHero";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Footer";

function Homepage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scroll");

    if (scrollTo === "homecard") {
      setTimeout(() => {
        const el = document.getElementById("homecard-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // small delay ensures DOM is ready
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeCard />
      <Footer />
    </>
  );
}

export default Homepage;