import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
  const AdminPanel = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token if needed
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/pending-requests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add if required
          },
        });

        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        // console.log("Fetched Requests:", data); // Debugging output
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleApproval = async (requestId, status) => {
    try {
      const token = localStorage.getItem("token"); // Get auth token if needed

      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/handle-request/${requestId}`, {
        method: "POST",
        headers: {
  
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token

        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to process request");

      alert(`Request ${status} successfully!`);
      setRequests(requests.filter((req) => req._id !== requestId)); // Remove from UI
    } catch (error) {
      console.error("Error processing request:", error);
      alert("Error processing request: " + error.message);
    }
  };

  return (
    <div className="container mt-5" >
      <h2 className="text-center text-danger">Admin Panel</h2>
      <p className="text-center text-dark">Review faculty requests</p>

      {loading ? (
        <p className="text-center">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-success">No pending requests!</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Faculty Name</th>
                <th>Club ID</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request?.facultyName || "N/A"}</td>
                  <td>{request?.data?.clubId || "N/A"}</td>
                  <td>{request?.description || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleApproval(request._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleApproval(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
      
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

export default AdminPanel;
