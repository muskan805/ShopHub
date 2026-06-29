import { FaBars, FaCaretDown } from "react-icons/fa";

function SecondaryNavbar() {
  return (
    <section className="secondary-navbar">

      <div className="menu-item all-menu">
        <FaBars />
        <span>All</span>
      </div>

      <a href="#">Beauty</a>
      <a href="#">Furniture</a>
      <a href="#">Books</a>
      <a href="#">Bestsellers</a>
      <a href="#">Today's Deals</a>
      <a href="#">Mobiles</a>
      <a href="#">Sports<FaCaretDown /></a>

      <a href="#">Appliances</a>
      <a href="#">Customer Service</a>
      <a href="#">Electronics</a>
      <a href="#">Fashion</a>

    </section>
  );
}

export default SecondaryNavbar;