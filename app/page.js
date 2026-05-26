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
import GasestePerfect from "./components/GasestePerfect";
import Livrare from "./components/Livrare";

export default function Home() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <NavBar />
      <HeroSection />
      <CumFunctioneaza />
      <ProduseNoi />
      <Reduceri />
      <SliderPopulare />
      <ImageAnimata />
      <Recenzii />
      <BlogPreview />
      <GasestePerfect />
      <Livrare />
      <Harta />
      <Footer />
    </div>
  );
}
