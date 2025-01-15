import AboutPTI from "./AboutPTI";
import Contact from "./Contact";
import "../../Styles.css";
const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="title">NBA Visualization</h1>
      <nav className="navlinks">
        <p>
          <AboutPTI />
        </p>
        <p>
          <Contact />
        </p>
      </nav>
    </header>
  );
};

export default Navbar;
