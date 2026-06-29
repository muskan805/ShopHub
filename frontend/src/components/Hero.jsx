import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <img
        src="/images/Hero.jpg"
        alt="Hero Banner"
      />

      <button
        className="shop-now-btn"
        onClick={() => navigate("/")}
      >
        Shop Now →
      </button>
    </section>
  );
}

export default HeroBanner;