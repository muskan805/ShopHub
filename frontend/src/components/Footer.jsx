function Footer() {
  return (
    <footer className="footer">

      <div
        className="back-to-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        Back to Top
      </div>

      <div className="footer-links">

        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
          <a href="#">Science & Innovation</a>
        </div>

        <div className="footer-column">
          <h3>Connect with Us</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>

        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <a href="#">Sell Products</a>
          <a href="#">Become a Seller</a>
          <a href="#">Affiliate Program</a>
          <a href="#">Advertise Products</a>
        </div>

        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <a href="#">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">100% Purchase Protection</a>
          <a href="#">Help</a>
        </div>

      </div>

      <div className="footer-bottom">

        <div className="footer-logo">
          ShopHub
        </div>

        <div className="footer-options">
          <button>🌐 English</button>
          <button>🇮🇳 India</button>
        </div>

      </div>

      <div className="copyright">
        © 2026 ShopHub. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;