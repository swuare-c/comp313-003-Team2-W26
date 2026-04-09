import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHistory, clearHistory } from "../api/reflectApi";
import { useAuth } from "../context/AuthContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Footer from "../components/Footer";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchHistory();
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Failed to load history", err);
        setError("Failed to load your chat history.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleClearHistory = async () => {
    const confirmed = window.confirm(
      "This will permanently delete your saved chat history. Do you want to continue?"
    );
    if (!confirmed) return;

    try {
      setClearing(true);
      setError("");

      await clearHistory();

      // Clear the UI state of history
      setHistory([]);

      // Also clear the last-chat UI for this user from localStorage
      if (user?.userId) {
        const storageKey = `listening_companion_chat_${user.userId}`;
        localStorage.removeItem(storageKey);
      }
    } catch (err) {
      console.error("Failed to clear history", err);
      setError("Failed to clear your history. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  const logoutAndRedirect = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-body-tertiary min-vh-100 min-vw-100 d-flex flex-column text-body">
      {/* NAVBAR */}
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
                variant="primary"
                size="sm"
                onClick={() => navigate("/chat")}
                className="px-3"
              >
                Back to Chat
              </Button>
            </Nav.Link>

            <Nav.Link as="div" className="p-0">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleClearHistory}
                disabled={clearing || loading}
              >
                {clearing ? "Clearing…" : "Clear history"}
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
              <NavDropdown.Item onClick={() => navigate("/chat")}>
                <i className="bi bi-chat-dots me-2"></i>Chat
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/settings")}>
                <i className="bi bi-person-circle me-2"></i>Settings
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
      <div className="flex-grow-1 py-4 py-md-5">
        <Container style={{ maxWidth: "960px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm bg-body">
                <Card.Body className="px-4 px-md-5 pt-4 pb-5">
                  <h3 className="fw-bold mb-2">Your chat history</h3>
                  <p className="text-secondary mb-4">
                    Review your past conversations with the listening companion.
                  </p>

                  {/* Loading state */}
                  {loading && (
                    <div className="d-flex justify-content-center py-4 align-items-center">
                      <Spinner animation="border" role="status" size="sm" />
                      <span className="ms-2 text-secondary">Loading…</span>
                    </div>
                  )}

                  {/* Error state */}
                  {error && !loading && (
                    <div className="alert alert-danger">{error}</div>
                  )}

                  {/* Empty state */}
                  {!loading && !error && history.length === 0 && (
                    <p className="text-secondary">
                      You don&apos;t have any saved conversations yet. Start a
                      conversation in the chat to see it here.
                    </p>
                  )}

                  {/* History list */}
                  {!loading && !error && history.length > 0 && (
                    <div
                      style={{
                        paddingRight: 4,
                      }}
                    >
                      {history.map((item) => (
                        <div key={item.id} className="mb-4">
                          <div className="text-secondary small mb-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </div>

                          {/* User message */}
                          <div className="d-flex mb-2 justify-content-end">
                            <div
                              className="user-bubble"
                              style={{
                                maxWidth: "80%",
                                background: "#dff1ff",
                                borderRadius: 12,
                                padding: "8px 12px",
                                fontSize: "0.95rem",
                                whiteSpace: "pre-wrap",
                                color: "#212529"
                              }}
                            >
                              {item.userText}
                            </div>
                          </div>

                          {/* AI reply */}
                          <div className="d-flex mb-1 justify-content-start">
                            <div
                              className="assistant-bubble"
                              style={{
                                maxWidth: "80%",
                                background: "#ffffff",
                                borderRadius: 12,
                                padding: "8px 12px",
                                fontSize: "0.95rem",
                                border: "1px solid #e5e5e5",
                                whiteSpace: "pre-wrap",
                                color: "#212529"
                              }}
                            >
                              {item.replyText}
                            </div>
                          </div>

                          <hr className="mt-3 mb-2 border-secondary-subtle" />
                                </div>
                              ))}
                            </div>
                          )}
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