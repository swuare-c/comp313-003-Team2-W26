import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileApi, deleteAccountApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [theme, setTheme] = useState(user?.settings?.theme || "light");
  const [reflectionDepth, setReflectionDepth] = useState(user?.settings?.reflectionDepth || "standard");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setTheme(user.settings?.theme || "light");
      setReflectionDepth(user.settings?.reflectionDepth || "standard");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await updateProfileApi({
        displayName,
        settings: { theme, reflectionDepth }
      });
      updateUser(res.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });

      // Auto-dismiss success message after 3 seconds
      setTimeout(() => {
        setMessage((prev) => prev.text === "Profile updated successfully!" ? { type: "", text: "" } : prev);
      }, 3000);

    } catch (err) {
      console.error("Update profile error:", err);
      setMessage({ type: "danger", text: err.response?.data?.message || "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccountApi();
      // Clear local state
      await logout();
      navigate("/", { state: { message: "Your account has been permanently deleted." } });
    } catch (err) {
      console.error("Delete account error:", err);
      setMessage({ type: "danger", text: "Failed to delete account. Please try again." });
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const logoutAndRedirect = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-light min-vh-100 min-vw-100 d-flex flex-column">
      {/* NAVBAR */}
      <Navbar bg="white" className="shadow-sm py-2">
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
                onClick={() => navigate("/chat")}
                className="px-3"
              >
                Go to Chat
              </Button>
            </Nav.Link>

            <NavDropdown
              title={
                <span className="text-muted small">
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
              <NavDropdown.Item onClick={() => navigate("/history")}>
                <i className="bi bi-clock-history me-2"></i>History
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
        <Container style={{ maxWidth: "800px" }}>
          <Row className="justify-content-center">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="px-4 px-md-5 py-4">
                  <h3 className="fw-bold mb-1">Profile Settings</h3>
                  <p className="text-muted mb-4 small">
                    Manage your account information and personalize your experience.
                  </p>

                  {message.text && (
                    <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
                      {message.text}
                    </Alert>
                  )}

                  <Tabs defaultActiveKey="account" id="profile-tabs" className="mb-4">
                    <Tab eventKey="account" title="Account">
                      <Form onSubmit={handleUpdateProfile} className="mt-3">
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-semibold">Email Address</Form.Label>
                          <Form.Control type="email" value={user?.email || ""} disabled />
                          <Form.Text className="text-muted">Email cannot be changed.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-semibold">Display Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="How should I address you?"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                          />
                        </Form.Group>

                        <div className="text-muted small mb-4">
                          Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </div>

                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </Form>
                    </Tab>

                    <Tab eventKey="personalization" title="Personalization">
                      <Form onSubmit={handleUpdateProfile} className="mt-3">
                        <Form.Group className="mb-4">
                          <Form.Label className="small fw-semibold d-block">Theme Preference</Form.Label>
                          <Form.Check
                            type="radio"
                            label="Light Mode"
                            name="theme"
                            id="theme-light"
                            checked={theme === "light"}
                            onChange={() => setTheme("light")}
                            inline
                          />
                          <Form.Check
                            type="radio"
                            label="Dark Mode"
                            name="theme"
                            id="theme-dark"
                            checked={theme === "dark"}
                            onChange={() => setTheme("dark")}
                            inline
                          />
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label className="small fw-semibold">Reflection Depth</Form.Label>
                          <Form.Select
                            value={reflectionDepth}
                            onChange={(e) => setReflectionDepth(e.target.value)}
                          >
                            <option value="brief">Brief - Concise reflections</option>
                            <option value="standard">Standard - Balanced listening</option>
                            <option value="in-depth">In-depth - Detailed exploration</option>
                          </Form.Select>
                          <Form.Text className="text-muted">
                            Controls how much the AI expands on its reflections.
                          </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save Personalization"}
                        </Button>
                      </Form>
                    </Tab>

                    <Tab eventKey="security" title="Security">
                      <div className="mt-3">
                        <p className="text-muted small mb-3">
                          To change your password, please use the password reset flow.
                        </p>
                        <Button variant="outline-secondary" size="sm" onClick={() => navigate("/reset-password-request")}>
                          Reset Password
                        </Button>

                        <hr className="my-4" />

                        <h6 className="text-danger fw-bold">Danger Zone</h6>
                        <p className="text-muted small">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Delete My Account
                        </Button>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">Delete Account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete your account? This action will:
          <ul className="mt-2 small">
            <li>Erase your profile information.</li>
            <li>Permanently delete your entire chat history.</li>
            <li>Be irreversible.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete Everything"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
