const UserNavbar = ({ setActiveSection }) => {
  return (
    <nav className="navbar navbar-expand-lg z-2 bg-transparent  ">
      <div className="container-fluid">
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
        <div
          className="collapse navbar-collapse d-flex justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex justify-content-center">
            <li className="nav-item">
              <button
                className="nav-link btn btn-outline-success"
                onClick={() => setActiveSection("club")}
              >
                Update Club Info
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-outline-success"
                onClick={() => setActiveSection("uploadImages")}
              >
                Upload Images
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-outline-success"
                onClick={() => setActiveSection("event")}
              >
                Event Upload
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

import PropTypes from "prop-types";

UserNavbar.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default UserNavbar;