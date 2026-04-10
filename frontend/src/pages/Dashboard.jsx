
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { reflectApi, fetchHistory } from "../api/reflectApi";
import { useNavigate } from "react-router-dom"; 

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Footer from "../components/Footer";

export default function Dashboard() {
  const bottomRef = useRef(null); 
  const navigate = useNavigate();   

  const { user, logout } = useAuth();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([]); // start empty
  const [hasLoaded, setHasLoaded] = useState(false);

  // Speech Recognition State
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  const greetingText =
    "Hi, I’m here to listen. You can share whatever is on your mind, and I’ll " +
    "reflect it back and ask gentle questions when helpful.";

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false; // Only final results to keep input clean
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput((prev) => (prev ? prev + " " + finalTranscript : finalTranscript));
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setError("Microphone access denied. Please enable it in your browser settings.");
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setError("");
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  // 1) On mount: restore from localStorage OR fall back to DB history
  useEffect(() => {
    console.log("entering Dashboard.jsx...");
    if (!user?.userId) return;

    const storageKey = `listening_companion_chat_${user.userId}`;

    const loadHistory = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        console.log("stored from localStorage:", stored);

        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("parsed from localStorage:", parsed);

          if (Array.isArray(parsed)) {
            setMessages(parsed);
            setHasLoaded(true);   // mark load done
            return;
          } else {
            console.warn("Stored chat is not an array. Resetting messages.");
          }
        }

        // No valid stored chat → start empty
        setMessages([]);
        setHasLoaded(true);       // still mark load done
      } catch (err) {
        console.error("Failed to load history:", err);
        setMessages([]);
        setHasLoaded(true);       // even on error, allow future saves
      }
    };

    console.log("LoadHistory...........");
    loadHistory();
    console.log("exiting useeffect of Dashboard.jsx...........");
  }, [user?.userId]);

  // 2) Whenever messages change, save to localStorage so navigation / reload keeps them
  useEffect(() => {
    console.log("messages UPDATED after setMessages:", messages);
  }, [messages]);

  useEffect(() => {
    if (!user?.userId) return;
    if (!hasLoaded) return;  

    const storageKey = `listening_companion_chat_${user.userId}`;
    try {
      console.log("messages UPDATED, saving:", messages);
      localStorage.setItem(storageKey, JSON.stringify(messages));
      console.log("successfully store in localStorage:", JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save chat to localStorage", e);
    }
  }, [messages, user?.userId, hasLoaded]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setLoading(true);

    // show user bubble immediately
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    try {
      const res = await reflectApi(text);
      const { reply } = res.data;

      // assistant reply bubble
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      console.error("Reflect error:", e?.response?.status, e?.response?.data);
      setError(e?.response?.data?.message || "Failed to get reflection.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // 4) New Chat — fresh UI; still saved to localStorage by the effect above
  const newChat = () => {
    setMessages([]);
    setInput("");
    setError("");

    if (user?.userId) {
      const storageKey = `listening_companion_chat_${user.userId}`;
      localStorage.removeItem(storageKey);   
    }
  };

  const logoutAndRedirect = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-body-tertiary min-vh-100 min-vw-100 d-flex flex-column text-body">
      {/* TOP NAVBAR — same style as Welcome.jsx */}
      <Navbar bg="body" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand 
            className="fw-semibold text-primary fs-4" 
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/app")}
          >
            Listening Companion
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as="div" className="p-0">
              <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={newChat}
                  className="px-3"
                >
                New Chat
              </Button>
            </Nav.Link>

            <NavDropdown 
              title={
                <span className="text-secondary small">
                  {user?.displayName || user?.email || "Account"}
                </span>
              } 
              id="profile-dropdown" 
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate("/app")}>
                <i className="bi bi-house me-2"></i>Home
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/settings")}>
                <i className="bi bi-person-circle me-2"></i>Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/history")}>
                <i className="bi bi-clock-history me-2"></i>History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/tutorial")}>
                <i className="bi bi-info-circle me-2"></i>Tutorial
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/resources")}>
                <i className="bi bi-heart-pulse me-2"></i>Support Resources
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutAndRedirect} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* PAGE CONTENT */}
      <div className="flex-grow-1 d-flex align-items-start justify-content-center py-4 py-md-5">
        <Container style={{ maxWidth: "960px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm bg-body">
                <Card.Body className="px-4 px-md-5 pt-4 pb-5">
                  {/* Logged-in info */}
                  <div className="text-secondary small mb-3">
                    {user?.displayName ? `Hello, ${user.displayName}` : `Logged in as: ${user?.email}`}
                  </div>

                  {/* Static greeting / tip */}
                  <div
                    className="mb-3 bg-light-custom"
                    style={{
                      borderRadius: 10,
                      padding: "10px 14px",
                      border: "1px solid var(--bs-border-color)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {greetingText}
                  </div>

                  {/* CHAT MESSAGES */}
                 {messages.length !== 0 && <div
                    className="chat-container-custom"
                    style={{
                      border: "1px solid var(--bs-border-color)",
                      borderRadius: 12,
                      padding: 14,
                      marginBottom: 16,
                    }}
                  >
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className="d-flex mb-2"
                        style={{
                          justifyContent:
                            m.role === "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          className={m.role === "user" ? "user-bubble" : "assistant-bubble"}
                          style={{
                            maxWidth: "78%",
                            whiteSpace: "pre-wrap",
                            padding: "10px 12px",
                            borderRadius: 12,
                            background:
                              m.role === "user" ? "#dff1ff" : "#ffffff",
                            border: "1px solid #e5e5e5",
                            color: "#212529",
                            fontSize: "0.95rem",
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>}

                  {/* INPUT AREA */}
                  {error && (
                    <div className="text-danger small mb-2">{error}</div>
                  )}

                  <textarea
                    rows={3}
                    className="form-control bg-body border-secondary-subtle"
                    style={{ borderRadius: 10 }}
                    placeholder="Type here... (Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={loading}
                  />

                  <div className="d-flex justify-content-end mt-2 align-items-center gap-2" ref={bottomRef}>
                    {isSpeechSupported && (
                      <Button
                        variant={isRecording ? "danger" : "outline-primary"}
                        onClick={toggleListening}
                        disabled={loading}
                        className={`rounded-circle d-flex align-items-center justify-content-center ${isRecording ? 'shadow-sm border-2' : ''}`}
                        style={{ 
                          width: "40px", 
                          height: "40px",
                          transition: "all 0.3s ease",
                          animation: isRecording ? "pulse-red 1.5s infinite" : "none"
                        }}
                        title={isRecording ? "Stop Listening" : "Start Voice Input"}
                      >
                        <i className={isRecording ? "bi bi-mic-fill" : "bi bi-mic"}></i>
                      </Button>
                    )}
                    <button
                      className="btn btn-primary px-4"
                      onClick={send}
                      disabled={loading || !input.trim()}
                    >
                      {loading ? "Thinking..." : "Send"}
                    </button>
                  </div>
                  </Card.Body>
                  </Card>
                  </Col>
                  </Row>
                  </Container>
                  </div>

                  <Footer />
                  </div>
                  );
                  }