import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./UserNavbar";
import UserEventForm from "./UserEventForm";
import UserClubForm from "./UserClubForm";
import UploadImages from "./UploadImages";

const UserAction = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clubInfo, setClubInfo] = useState(null);
  const [activeSection, setActiveSection] = useState("club"); // Default to 'club'
  const [formData, setFormData] = useState({
    clubId: "",
    name: "",
    description: "",
    themes: "",
    eventsActivities: "",
    membershipDetails: "",
    leadershipContact: "",
    changeDescription: "",
  });

  // Fetch user info and check mobile device
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (window.innerWidth < 1000) {
      alert("Mobile devices are not allowed");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.clubId) fetchClubData(parsedUser.clubId);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Fetch the club data for the logged-in user
  const fetchClubData = async (clubId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/${clubId}`);
      if (!response.ok) throw new Error("Club not found");
      const data = await response.json();
      handleChange({ target: { name: "clubId", value: data.clubId } });
      setClubInfo(data);
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  };
  // Handle input change for form fields


  // Handle the form submission (sending data to admin for approval)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Show a prompt for the user to describe the change
    const changeDescription = prompt("Please describe the change you made (e.g., changed title)");

    if (changeDescription) {
      // Add the change description to the form data
      setFormData((prev) => ({
        ...prev,
        changeDescription: changeDescription,
      }));

      const requestData = {
        type: activeSection, // Set type as 'club' or 'event'
        data: formData,  // Send the entire formData as data
        facultyName: user?.username, // Include the faculty name
        description: changeDescription, // Include the change description
        clubId: user?.clubId, // Include the clubId if available  
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/submit-request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) throw new Error("Failed to submit request");

        alert("Request submitted for admin approval!");
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("Error: " + error.message);
      }
    } else {
      alert("Please provide a description of the change.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Welcome, {user?.username}!</h2>
      <p className="w-full">Your Role: {user?.role}</p>
      <UserNavbar setActiveSection={setActiveSection} />

      {/* Conditional rendering based on activeSection */}
      {activeSection === "club" && (
        <UserClubForm 
          clubInfo={clubInfo} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          clubId={user?.clubId}          
        />
      )}
      {activeSection === "event" && (
        <UserEventForm clubId={user?.clubId} facultyName={user?.username} />
      )}
      {activeSection === "uploadImages" && <UploadImages clubId={user?.clubId}/>}

      <div className="text-center mt-4 mb-4">
        <button 
          className="btn btn-danger" 
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserAction;
