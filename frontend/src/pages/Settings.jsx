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
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Footer from "../components/Footer";

export default function Settings() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [occupation, setOccupation] = useState(user?.occupation || "");
  const [gender, setGender] = useState(user?.gender || "");

  const [theme, setTheme] = useState(user?.settings?.theme || "light");
  const [reflectionDepth, setReflectionDepth] = useState(user?.settings?.reflectionDepth || "standard");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setOccupation(user.occupation || "");
      setGender(user.gender || "");
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
        occupation,
        gender,
        settings: { theme, reflectionDepth }
      });
      updateUser(res.data.user);
      setMessage({ type: "success", text: "Settings updated successfully!" });

      setTimeout(() => {
        setMessage((prev) => prev.text === "Settings updated successfully!" ? { type: "", text: "" } : prev);
      }, 3000);

    } catch (err) {
      console.error("Update settings error:", err);
      setMessage({ type: "danger", text: err.response?.data?.message || "Failed to update settings." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccountApi();
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
      <div className="flex-grow-1 py-4 py-md-5">
        <Container>
          <Row className="g-4">
            {/* SIDEBAR */}
            <Col lg={3}>
              <h4 className="fw-bold mb-4 px-2">Settings</h4>
              <ListGroup className="border-0 shadow-sm rounded-3 overflow-hidden">
                <ListGroup.Item
                  action
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                  className="border-0 py-3 d-flex align-items-center"
                >
                  <i className="bi bi-person-circle me-3 fs-5"></i>
                  <span>Public Profile</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  active={activeTab === "preferences"}
                  onClick={() => setActiveTab("preferences")}
                  className="border-0 py-3 d-flex align-items-center"
                >
                  <i className="bi bi-sliders me-3 fs-5"></i>
                  <span>Preferences</span>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  active={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                  className="border-0 py-3 d-flex align-items-center"
                >
                  <i className="bi bi-shield-lock me-3 fs-5"></i>
                  <span>Account & Security</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* MAIN CONTENT AREA */}
            <Col lg={9}>
              <Card className="border-0 shadow-sm rounded-3 bg-body">
                <Card.Body className="p-4 p-md-5">

                  {message.text && (
                    <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
                      {message.text}
                    </Alert>
                  )}

                  {/* PROFILE TAB */}
                  {activeTab === "profile" && (
                    <div>
                      <h5 className="fw-bold mb-1">Public Profile</h5>
                      <p className="text-secondary small mb-4">How you appear to the Listening Companion.</p>
                      <hr className="mb-4 border-secondary-subtle" />

                      <Form onSubmit={handleUpdateProfile}>
                        <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
                          <Form.Label className="small fw-semibold text-secondary">Display Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="How should I address you?"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="py-2 bg-body border-secondary-subtle"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
                          <Form.Label className="small fw-semibold text-secondary">Occupation</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. Student, Designer, Retired"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="py-2 bg-body border-secondary-subtle"
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
                          <Form.Label className="small fw-semibold text-secondary">Gender</Form.Label>
                          <Form.Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="py-2 bg-body border-secondary-subtle"
                          >
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </Form.Select>
                        </Form.Group>

                        <div className="text-secondary small mb-4">
                          Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </div>

                        <Button variant="primary" type="submit" disabled={loading} className="px-4">
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </Form>
                    </div>
                  )}

                  {/* PREFERENCES TAB */}
                  {activeTab === "preferences" && (
                    <div>
                      <h5 className="fw-bold mb-1">App Preferences</h5>
                      <p className="text-secondary small mb-4">Customize your interaction and visual experience.</p>
                      <hr className="mb-4 border-secondary-subtle" />

                      <Form onSubmit={handleUpdateProfile}>
                        <Form.Group className="mb-4">
                          <Form.Label className="small fw-semibold d-block mb-3 text-secondary">Theme Preference</Form.Label>
                          <div className="d-flex gap-4">
                            <Form.Check
                              type="radio"
                              label="Light Mode"
                              name="theme"
                              id="theme-light"
                              checked={theme === "light"}
                              onChange={() => setTheme("light")}
                            />
                            <Form.Check
                              type="radio"
                              label="Dark Mode"
                              name="theme"
                              id="theme-dark"
                              checked={theme === "dark"}
                              onChange={() => setTheme("dark")}
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-4" style={{ maxWidth: "500px" }}>
                          <Form.Label className="small fw-semibold text-secondary">Reflection Depth</Form.Label>
                          <Form.Select
                            value={reflectionDepth}
                            onChange={(e) => setReflectionDepth(e.target.value)}
                            className="py-2 bg-body border-secondary-subtle"
                          >
                            <option value="brief">Brief - Concise mirroring</option>
                            <option value="standard">Standard - Balanced listening</option>
                            <option value="in-depth">In-depth - Detailed exploration</option>
                          </Form.Select>
                          <Form.Text className="text-secondary opacity-75">
                            Controls how detailed the AI's reflections and questions will be.
                          </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading} className="px-4">
                          {loading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </Form>
                    </div>
                  )}

                  {/* ACCOUNT TAB */}
                  {activeTab === "account" && (
                    <div>
                      <h5 className="fw-bold mb-1">Account & Security</h5>
                      <p className="text-secondary small mb-4">Manage your credentials and account data.</p>
                      <hr className="mb-4 border-secondary-subtle" />

                      <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
                        <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
                        <Form.Control type="email" value={user?.email || ""} disabled className="bg-body-tertiary py-2 border-secondary-subtle" />
                        <Form.Text className="text-secondary opacity-75">Contact support to change your email.</Form.Text>
                      </Form.Group>

                      <div className="mb-5">
                        <h6 className="fw-bold mb-2">Password</h6>
                        <p className="text-secondary small mb-3">Secure your account by updating your password regularly.</p>
                        <Button variant="outline-primary" size="sm" onClick={() => navigate("/reset-password-request")}>
                          Change Password
                        </Button>
                      </div>

                      <div className="p-4 rounded-3 border border-danger-subtle bg-danger-subtle bg-opacity-10">
                        <h6 className="text-danger fw-bold mb-2">Danger Zone</h6>
                        <p className="small mb-3 text-secondary opacity-75">
                          Deleting your account is permanent. All your data, including your entire reflection history, will be erased forever.
                        </p>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Delete My Account
                        </Button>
                      </div>
                    </div>
                  )}

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger fw-bold">Permanently delete account?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <p>This action cannot be undone. You will lose access to all your saved reflections and profile data.</p>
          <div className="alert alert-warning small py-2">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Final warning: This will erase your entire history.
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={() => setShowDeleteModal(false)} disabled={loading}>
            I changed my mind
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete Everything"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}
