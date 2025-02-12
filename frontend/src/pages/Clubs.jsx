import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClubCard from "./ClubCard";

const Clubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true); // ✅ Loading state added

  // Fetch clubs from the backend
  const fetchClubs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs`);
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    } finally {
      setLoading(false); // ✅ Stop loading after data is fetched
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide effect (Only runs if clubs are available)
  useEffect(() => {
    if (clubs.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= clubs.length - 3 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [clubs.length]);

  // Function to navigate to a club's details page
  const handleClubClick = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  return (
    <section id="clubs" className="clubs">
      <div>
        <div className="py-3">
          <h2 className="fw-bold text-center m-6">Our Clubs</h2>
        </div>

        {/* ✅ Show Loading Animation if Fetching Data */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center items-center max-w-6xl mx-auto flex-directions-column">
            <div className="flex justify-content-center align-content-center">
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? clubs.length - 3 : prev - 1
                  )
                }
                className="p-1 bg-transparent rounded text-sm"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/left.png"
                  style={{ height: "2rem" }}
                  alt="Prev"
                />
              </button>
            </div>

            {/* ✅ Show Clubs Only When Available */}
            {clubs.length > 0 ? (
              <div className="d-flex overflow-hidden justify-content-center align-content-center club-carousel">
                {clubs
                  .slice(
                    currentIndex,
                    windowWidth <= 500
                      ? currentIndex + 1
                      : windowWidth <= 800
                      ? currentIndex + 2
                      : currentIndex + 3
                  )
                  .map((club) => (
                    <div
                      key={club.id}
                      className="flex-shrink-0 w-1/3 px-2"
                      onClick={() => handleClubClick(club.clubId)}
                      style={{ cursor: "pointer" }}
                    >
                      <ClubCard
                        name={club.name}
                        description={club.description}
                        image={club.images[0] || "/gprec_logo1.png"}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-muted">No clubs available.</p>
            )}

            <div className="flex justify-content-center align-content-center">
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === clubs.length - 3 ? 0 : prev + 1
                  )
                }
                className="p-1 bg-transparent rounded text-sm"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/right.png"
                  style={{ height: "2rem" }}
                  alt="Next"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clubs;
