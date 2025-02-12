import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Store error messages
  const navigate = useNavigate(); // Hook to handle redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // console.log("Login successful:", data);
      if(data.user.role === "user") navigate("/user-action");
      else navigate("/admin-panel");

    } catch (err) {
      setError(err.message);
    }
  };

  return (<>
    <div className="container d-flex justify-content-center align-items-center vh-100 vw-100 bg-light bg-transparent flex-column ">
      <div className="row w-100 justify-content-center">
    <p>Only for Faculty Coordinators</p>
    
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card p-4 shadow-lg rounded" style={{ borderRadius: "15px", background: "#ffffff" }}>
            <h2 className="text-center mb-2 text-primary">Welcome Back</h2>
            <p className="text-center text-muted">Login to continue</p>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </div>
              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none text-primary">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
