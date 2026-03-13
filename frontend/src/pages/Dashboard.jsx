
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

export default function Dashboard() {
  const bottomRef = useRef(null); 
  const navigate = useNavigate();   

  const { user, logout } = useAuth();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([]); // start empty
  const [hasLoaded, setHasLoaded] = useState(false);

  const greetingText =
    "Hi, I’m here to listen. You can share whatever is on your mind, and I’ll " +
    "reflect it back and ask gentle questions when helpful.";

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

  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-column">
      {/* TOP NAVBAR — same style as Welcome.jsx */}
      <Navbar bg="white" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand className="fw-semibold text-primary fs-4">
            Listening Companion
          </Navbar.Brand>

          <div className="ms-auto d-flex gap-2">
            <Button
                variant="outline-secondary"
                size="sm"
                onClick={newChat}
              >
              New Chat
            </Button>

            {/* Tutorial button visible to logged-in users */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/tutorial")}
            >
              Tutorial
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/history")}
            >
              History
            </Button>

            <Button variant="outline-primary" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* PAGE CONTENT */}
      <div className="flex-grow-1 d-flex align-items-start justify-content-center py-4 py-md-5">
        <Container style={{ maxWidth: "960px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="px-4 px-md-5 pt-4 pb-5">
                  {/* Logged-in info */}
                  <div className="text-muted small mb-3">
                    Logged in as:{" "}
                    <span className="fw-semibold">{user?.userId}</span>
                  </div>

                  {/* Static greeting / tip */}
                  <div
                    className="mb-3"
                    style={{
                      borderRadius: 10,
                      padding: "10px 14px",
                      background: "#f5f7fb",
                      border: "1px solid #e3e7f0",
                      fontSize: "0.95rem",
                    }}
                  >
                    {greetingText}
                  </div>

                  {/* CHAT MESSAGES */}
                 {messages.length !== 0 && <div
                    style={{
                      border: "1px solid #e5e5e5",
                      borderRadius: 12,
                      padding: 14,
                      background: "#fafafa",
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
                          style={{
                            maxWidth: "78%",
                            whiteSpace: "pre-wrap",
                            padding: "10px 12px",
                            borderRadius: 12,
                            background:
                              m.role === "user" ? "#dff1ff" : "#ffffff",
                            border: "1px solid #e5e5e5",
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
                    className="form-control"
                    style={{ borderRadius: 10 }}
                    placeholder="Type here... (Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={loading}
                  />

                  <div className="d-flex justify-content-end mt-2" ref={bottomRef}>
                    <button
                      className="btn btn-primary"
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
    </div>
  );
}