import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom"; // If using React Router
import EventHeading from "./EventHeading";
import ImageCard from "./ImageCard";
import Gallery from "./Gallery";
import "../App.css";

const ClubDetail = () => {
  const { id } = useParams(); // Get club name from URL
  const [clubInfo, setClubInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch club data from backend
  const fetchClubData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/${id.toLowerCase()}`);
      if (!response.ok) throw new Error("Club not found");
      const data = await response.json();
      setClubInfo(data);
    } catch (error) {
      console.error("Error fetching club data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, [id]);

  if (loading) return <p className="text-center text-light">Loading...</p>;
  if (!clubInfo) return <p className="text-center text-danger">Club not found</p>;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", minWidth: "100vw", background: "#101820", color: "white" }}>
      <div className="m-3 shadow-lg d-flex flex-column justify-content-between w-75" style={{ minHeight: "100vh", width: "70vw", background: "#101820" }}>
        <div className="card-body overflow-auto">
          
          {/* Club Name */}
          <EventHeading text={clubInfo.name.toUpperCase()} />

          <div className="row">
            <div className="col-md-1"></div>
            <div className="club-page col-md-6 d-flex flex-column justify-content-center text-start">
              <h3 style={{ color: "#ffd900d6" }}>Description & Theme</h3>
              <p>{clubInfo.description}</p>
            </div>
            <div className="col-md-4">
              <ImageCard image={clubInfo.images?.[0] || "https://via.placeholder.com/"} />
            </div>
            <div className="col-md-1"></div>

            <div className="club-page col-md-12 text-start">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h3 style={{ color: "#ffd900d6" }}>Activities & Events</h3>
                  <ul className="ps-3">
                    {clubInfo.eventsActivities.map((activity, index) => (
                      <li key={index} style={{ listStyle: "decimal" }}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-1"></div>
              </div>

              <div className="row mt-2">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h3 style={{ color: "#ffd900d6" }}>Membership Details</h3>
                  <p><strong>How to join?</strong> {clubInfo.membershipDetails}</p>
                </div>
                <div className="col-md-1"></div>
              </div>

              <div className="row mt-2">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                  <h3 style={{ color: "#ffd900d6" }}>Leadership & Contact</h3>
                  <p><strong>Contact:</strong> {clubInfo.leadershipContact}</p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-1"></div>
                <div className="col-md-11">
                  <h3 style={{ color: "#ffd900d6" }}>Testimonials</h3>
                  {clubInfo.testimonials.map((testimonial, index) => (
                    <blockquote key={index} className="fst-italic">{testimonial}</blockquote>
                  ))}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h3 style={{ color: "#ffd900d6" }}>Gallery</h3>
                  <Gallery club={clubInfo} />
                </div>
                <div className="col-md-1"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ClubDetail.propTypes = {
  id: PropTypes.string.isRequired
};

export default ClubDetail;
