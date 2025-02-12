import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the event ID from the URL
import EventHeading from "./EventHeading";
import Gallery from "./Gallery";

const EventCard = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data from the backend API
  const fetchEventData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`);
      if (!response.ok) {
        throw new Error("Event not found");
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  if (loading) return <p className="text-center text-light">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  // Format event date
  const formatDateTime = (isoString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(isoString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", minWidth: "100vw", background: "#101820", color: "white" }}>
      <div className="card m-3 shadow-lg d-flex flex-column justify-content-between w-75" style={{ minHeight: "100vh", width: "70vw", justifyContent: "center", alignItems: "center", background: "#101820", color: "white" }}>
        
        {/* Event Name */}
        <EventHeading text={event.eventName.toUpperCase()} />

        {/* Event Date */}
        <h3 className="text-center text-warning mt-3">{formatDateTime(event.eventDate)}</h3>

        {/* Event Images */}
        {event.images && event.images.length > 0 && (
          <div className="d-flex justify-content-center flex-wrap gap-3 my-3">
            {event.images.map((img, index) => (
              <img key={index} src={img} alt={`Event ${index + 1}`} className="rounded shadow" style={{ width: "250px", height: "150px", objectFit: "cover" }} />
            ))}
          </div>
        )}

        <div className="card-body overflow-auto">
          {/* Description */}
          <p className="card-text text-muted">{event.description}</p>

          {/* Instructions */}
          <h3 className="mt-3 fw-bold">Instructions:</h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {event.instructions.split("\n").map((inst, index) => (
              <li key={index}>{inst}</li>
            ))}
          </ul>

          {/* Registration Process */}
          <h3 className="mt-3 fw-bold">Registration Process:</h3>
          <p>{event.registrationProcess}</p>

          {/* Registration Link */}
          {event.registrationLinks?.length > 0 && (
            <a href={event.registrationLinks[0]} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Event Details
            </a>
          )}

          {/* Contact Details */}
          <h3 className="mt-3 fw-bold">Have Questions?</h3>
          <p className="fw-bold fs-5">📞 {event.contact}</p>

          <h3 className="mt-3 fw-bold">Gallery</h3>
          <Gallery club={event}></Gallery>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
