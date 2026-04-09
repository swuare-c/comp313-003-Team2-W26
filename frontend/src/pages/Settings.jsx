import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    //No backend endpoint yet 
    setMessage("Settings saved (demo only)");
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* NAVBAR */}
      <Navbar bg="white" className="shadow-sm py-2">
        <Container>
          <Navbar.Brand className="fw-semibold text-primary fs-4">
            Listening Companion
          </Navbar.Brand>

          <div className="ms-auto d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/app")}
            >
              Dashboard
            </Button>

            <Button variant="outline-primary" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* CONTENT */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Container style={{ maxWidth: "500px" }}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h4 className="mb-3">Settings</h4>

              <div className="mb-3 text-muted small">
                Logged in as: <strong>{user?.userId}</strong>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>New Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter new email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {message && (
                  <div className="text-success small mb-2">{message}</div>
                )}

                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}