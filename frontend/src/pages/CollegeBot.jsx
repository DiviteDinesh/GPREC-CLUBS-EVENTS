import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Custom CSS for styling

const CollegeBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null); // Clear previous response
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/get-result?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await res.json();
      setResponse(data.text || "No response received.");
    } catch (error) {
      setResponse("Error fetching response. Please try again.");
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="chatbot-section">
      <div>
        <div className="container py-4">
          <div className="chatbot-card glass-effect">
            <h3 className="text-center mb-3 title-glow">🤖 College Bot</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control chatbot-input"
                  placeholder="Ask me something about GPREC..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2">Thinking...</span>
                    </>
                  ) : (
                    "Ask"
                  )}
                </button>
              </div>
            </form>

            {response && (
              <div className="response-box animate__animated animate__fadeInUp">
                {/* <strong>Response:</strong> */}
                <p className="mt-2">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeBot;
