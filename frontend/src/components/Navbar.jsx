import { Link } from "react-router-dom";
import logo from "/img/logo.svg";
import userIcon from "/img/user.png";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" />

      {/* Home */}
      <Link to="/landingpage">Home</Link>

      {/* Halaman utama Scholarship Hub */}
      <Link to="/scholarshiphub">Scholarship Hub</Link>

      {/* Halaman Eduprep Tools */}
      <Link to="/eduprep-tools">Eduprep Tools</Link>

      {/* Halaman Edurise Academy*/}
      <Link to="/eduriseacademy">Edurise Academy</Link>

      {/* Halaman Edu Event */}
      <Link to="/eduevent">Edu Event</Link>

      {/* Halaman Edu Connect */}
      <Link to="/educonnect">Educonnect</Link>

      {/* Ikon user */}
      <a href="/profile">
        <img src={userIcon} alt="User" className="user-icon" />
      </a>
    </nav>
  );
};

export default Navbar;
