import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-body border-top py-3 mt-auto small text-secondary">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div>© {new Date().getFullYear()} Listening Companion</div>
        <div className="d-flex gap-3">
          <span 
            style={{ cursor: "pointer" }} 
            className="text-primary fw-semibold"
            onClick={() => navigate("/resources")}
          >
            Support Resources
          </span>
          <span className="text-muted">|</span>
          <span>Not a medical or crisis service.</span>
        </div>
      </Container>
    </footer>
  );
}
