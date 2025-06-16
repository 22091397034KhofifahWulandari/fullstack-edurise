import "../index.css";

const Footer = () => {
  return (
    <footer>
      <div className="column">
        <div className="branding">
          <img src="/img/logo.svg" alt="Logo" />
          <h2>EDU<span>RISE</span></h2>
        </div>
        <p>
          Solusi lengkap informasi beasiswa dan edukasi, membantu Anda
          merencanakan masa depan pendidikan yang gemilang.
        </p>
        <div className="socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>

      <div className="column">
        <h3>Contact</h3>
        <p>
          Phone: <a href="tel:+62855311">+62855311</a>
        </p>
        <p>
          Email:{" "}
          <a href="mailto:EduRise@education.co.id">EduRise@education.co.id</a>
        </p>
        <p>Jl. Jendral Sudirman 18, Jakarta, Indonesia</p>
      </div>

      <div className="column">
        <h3>Features</h3>
        <p>
          <a href="/scholarshiphub">Scholarship Hub</a>
        </p>
        <p>
          <a href="/eduprep-tools">EduPrep Tools</a>
        </p>
        <p>
          <a href="/eduriseacademy">Edurise Academy</a>
        </p>
        <p>
          <a href="/eduevent">Edu Events</a>
        </p>
        <p>
          <a href="/educonnect">Edu Connect</a>
        </p>
      </div>

      <div className="column">
        <h3>Product</h3>
        <p>
          <a href="/eduprep-tools/template-cv">Template CV</a>
        </p>
        <p>
          <a href="/forumdiskusi">Join Community</a>
        </p>
        <p>
          <a href="#">Submit Feedback</a>
        </p>
      </div>

      <div className="copyright">
        <p>© 2025 EDURISE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
