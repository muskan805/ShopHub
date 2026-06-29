import Navbar from "../components/Navbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductShowcase from "../components/ProductShowcase";
import DealsSection from "../components/DealsSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      {/* Sticky Header */}
      <div className="header">
        <Navbar />
        <SecondaryNavbar />
      </div>

      <Hero />
      <CategorySection />
      <ProductShowcase />
      <DealsSection />
      <Footer />
    </>
  );
}

export default Home;