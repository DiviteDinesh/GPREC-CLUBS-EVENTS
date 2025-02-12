import "bootstrap/dist/css/bootstrap.min.css";

const clubs = ["Coders Club", "CodeChef GPREC", "TNP Club", "English Club", "CIE", "IEEE", "IEI", "CSI", "VCS", "SPORTS", "BHUVANAVIJAYAM", "TEDX-GPREC"];
clubs.sort();

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo and Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/gprec_logo1.png"
            alt="Logo"
            className="me-2"
            style={{ height: "15vw", maxHeight: "50px", width: "auto" }}
          />
          <span className="fw-bold" style={{ fontSize: "1.5rem", color: "black" }}>
            CLUBS
          </span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events-all">Events</a>
            </li>

            {/* Dropdown for Clubs */}
            <li className="nav-item dropdown position-relative">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="clubsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Clubs
              </a>
              <ul className="dropdown-menu position-absolute" aria-labelledby="clubsDropdown">
                {clubs.map((club, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href={`/clubs/${club.toLowerCase().replace(/\s+/g, '-')}`}>
                      {club}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#chatbot">AskChatBot</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">ContactUs</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-success rounded-5" onClick={() => window.location.href = "/login"}>
                LOGIN
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
