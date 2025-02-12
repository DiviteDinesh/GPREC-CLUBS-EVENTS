import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpcomingEventCard from "./UpcomingEventCard";
import { useNavigate } from "react-router-dom";  // For handling redirection
import "../App.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [showAllUpcoming] = useState(false); // To track whether to show all upcoming events
  const navigate = useNavigate();  // Hook to navigate to EventInfo page

  // Fetch all events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Categorize events into upcoming and past
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = new Date();

      const upcoming = events.filter((event) => {
        const eventDate = new Date(event.eventDate); // Convert to Date object
        return eventDate > currentDate;
      });

      const past = events.filter((event) => {
        const eventDate = new Date(event.eventDate); // Convert to Date object
        return eventDate <= currentDate;
      });
        // Sort by event date in ascending order (earliest to latest)
      upcoming.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      
      // Sort past events in descending order (latest to oldest)
      past.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
  }, [events]);

  // Handle the "Show All" button click
  const handleShowAllUpcoming = () => {
    navigate("/events-all"); // Navigate to the events-all page
  };

  // Handle past event click to navigate to the Event Info page
  const handlePastEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <section id="events" className="events py-5 bg-light">
      
      <div className="container">
        <h2 className="fw-bold text-center m-6 py-5 text-primary-emphasis">Upcoming Events</h2>

        {/* Upcoming Events Section */}
        <div className="row">
          
          {upcomingEvents.slice(0, showAllUpcoming ? upcomingEvents.length : 3).map((event) => (
            <UpcomingEventCard
              key={event.eventId}
              eventId={event.eventId}
              title={event.eventName}
              date={new Date(event.eventDate).toLocaleDateString()}
              description={event.description}
              image={event.images[0] || "/OIP.jpg"}
            />
          ))}
        </div>

        {/* Show All Button */}
        {upcomingEvents.length > 3 && !showAllUpcoming && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-info"
              onClick={handleShowAllUpcoming}
            >
              Show All Events
            </button>
          </div>
        )}

        {/* Past Events Section */}
        <h2 className="text-center text-success-emphasis fw-bold mt-5">Past Events</h2>
        <div className="card shadow-lg event-card mt-3">
          <div className="card-body">
            <div className="past-events-container">
              <div className="marquee">
                <div className="marquee-content">
                  {pastEvents.map((event) => (
                    <span
                      key={event.eventId}
                      className="marquee-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePastEventClick(event.eventId)} // Navigate to event details on click
                    >
                      {event.eventName} •
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-muted">
              Relive the best moments from our past events!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
