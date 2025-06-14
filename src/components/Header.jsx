import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import axios from "axios";
import "../assets/css/header.css"; // Custom styles here if needed

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    axios
      .get("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("User fetch failed", err));
  }, [navigate, token]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout/", {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/signup");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="px-4 custom-navbar"
      style={{
        background: "linear-gradient(to right, #ff4b2b, #ff416c)", // Matching gradient
        color: "#fff",
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-4">
          CrowdFund
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" />
        <Navbar.Collapse className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/projects" className="text-white mx-2">Projects</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {user ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <Image
                      src={user.profile_picture ? `http://localhost:8000${user.profile_picture}` : "/default-profile.png"}
                      width="42"
                      height="42"
                      alt="Profile"
                      className="me-2"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #fff",
                      }}
                    />
                    <span className="text-white fw-semibold">{user.first_name}</span>
                  </div>
                }
                id="user-nav-dropdown"
                align="end"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/signup" className="text-white">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
