import { useState } from "react";
import PropTypes from "prop-types";

const UserEventForm = ({ clubId, facultyName }) => {
  const [eventFormData, setEventFormData] = useState({
    eventId: "",
    eventName: "",
    eventDate: "",
    description: "",
    instructions: "",
    registrationProcess: "",
    registrationLinks: "",
    contact: "",
    images: [] // Store uploaded image URLs
  });

  const [selectedFiles, setSelectedFiles] = useState([]); // Files to be uploaded

  // Handle input change for each field
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Handle Image Upload and Append URLs
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventFormData.eventId}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      // console.log(...result.uploadedImages);
      if (response.ok) {
        setEventFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...result.uploadedImages], // Append new images
        }));

        alert("Upload successful!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle Form Submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();

    if (!eventFormData.eventId || !eventFormData.eventName || !eventFormData.eventDate) {
      alert("Event ID, Name, and Date are required!");
      return;
    }

    const eventDescription = prompt("Please describe the event:");
    if (!eventDescription) {
      alert("Event description is required to proceed.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to submit an event.");
        return;
      }

      const dataToSend = {
        ...eventFormData,
        registrationLinks: eventFormData.registrationLinks
          .split(",")
          .map((link) => link.trim()), // Convert to array
      };

      console.log("Sending event data:", dataToSend);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/submit-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "event",
          data: dataToSend,
          clubId,
          facultyName,
          description: eventDescription,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit event request");
      }

      alert("Event submitted successfully for approval!");
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Error submitting event: " + error.message);
    }
  };

  return (
    <div className="container mt-5 text-start">
      <form onSubmit={handleEventSubmit} className="p-4 shadow-lg bg-white rounded-2">
        <h2 className="text-center text-primary">Create New Event</h2>

        <div className="mb-3">
          <label className="form-label">Event ID</label>
          <input
            type="text"
            className="form-control"
            name="eventId"
            value={eventFormData.eventId}
            onChange={handleEventChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            name="eventName"
            value={eventFormData.eventName}
            onChange={handleEventChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Date</label>
          <input
            type="date"
            className="form-control"
            name="eventDate"
            value={eventFormData.eventDate}
            onChange={handleEventChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={eventFormData.description}
            onChange={handleEventChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            name="instructions"
            value={eventFormData.instructions}
            onChange={handleEventChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Registration Process</label>
          <textarea
            className="form-control"
            name="registrationProcess"
            value={eventFormData.registrationProcess}
            onChange={handleEventChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Registration Links (Comma Separated)</label>
          <input
            type="text"
            className="form-control"
            name="registrationLinks"
            value={eventFormData.registrationLinks}
            onChange={handleEventChange}
            placeholder="link1, link2, ..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={eventFormData.contact}
            onChange={handleEventChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input type="file" multiple className="form-control" accept="image/*" onChange={handleImageChange} />
          <button type="button" className="btn btn-secondary mt-2" onClick={handleImageUpload}>Upload Images</button>
        </div>

        {/* Show Uploaded Image URLs */}
        {eventFormData.images.length > 0 && (
          <div className="text-center mt-3">
            <h5>Recently Uploaded Images:</h5>
            {eventFormData.images.map((url, index) => (
              <img key={index} src={url} alt="Uploaded" width="100" height="100" className="m-2" />
            ))}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Create Event</button>
      </form>
    </div>
  );
};

UserEventForm.propTypes = {
  clubId: PropTypes.string.isRequired,
  facultyName: PropTypes.string.isRequired,
};

export default UserEventForm;
