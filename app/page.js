import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CumFunctioneaza from "./components/CumFunctioneaza";
import CategoriiMari from "./components/CategoriiMari";
import ProduseNoi from "./components/ProduseNoi";
import Reduceri from "./components/Reduceri";
import SliderPopulare from "./components/SliderPopulare";
import Harta from "./components/Harta";
import ImageAnimata from "./components/ImageAnimata";
import Recenzii from "./components/Recenzii";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <NavBar />
      <HeroSection />
      <CumFunctioneaza />
      <div style={{ marginBottom: 160 }}><ProduseNoi /></div>
      <div style={{ marginBottom: 160 }}><Reduceri /></div>
      <div style={{ marginBottom: 160 }}><SliderPopulare /></div>
      <div style={{ marginBottom: 160 }}><ImageAnimata /></div>
      <div style={{ marginBottom: 160 }}><Recenzii /></div>
      <div style={{ marginBottom: 160 }}><BlogPreview /></div>
      <Harta />
      <Footer />
    </div>
  );
}
