import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../App.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = new Date();
      const upcoming = events.filter((event) => new Date(event.eventDate) > currentDate);
      const past = events.filter((event) => new Date(event.eventDate) <= currentDate);
        // Sort by event date in ascending order (earliest to latest)
    upcoming.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    
    // Sort past events in descending order (latest to oldest)
    past.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
  }, [events]);

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary">Upcoming Events</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-4 text-start">
          <thead className="table-primary">
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {upcomingEvents.map((event) => (
              <tr key={event.eventId}>
                <td style={{ cursor: "pointer", color:"blue" }} onClick={() => navigate(`/event/${event.eventId}`)}>
                  {event.eventName}
                </td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="text-wrap" style={{ maxWidth: "400px" }}>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-center text-success mt-5">Past Events</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-4 text-start ps-5">
          <thead className="table-success">
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {pastEvents.map((event) => (
              <tr key={event.eventId}>
                <td style={{ cursor: "pointer", color:"blueviolet" }} onClick={() => navigate(`/event/${event.eventId}`)}>
                  {event.eventName}
                </td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="text-wrap" style={{ maxWidth: "400px" }}>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
