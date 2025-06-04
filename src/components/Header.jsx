import React from 'react'
import { Link } from 'react-router';
import { Navbar, Container, Nav, NavDropdown ,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import "../assets/css/header.css"
export default function Header() {
  const navigate=useNavigate()
  // if not signup or login redir to loginpage
  const token = localStorage.getItem('token');
  useEffect(() => {
   if (!token) {
      navigate('/signup');  // redirect if no token
    }
  }, [navigate]);
  const handleLogout = async () => {
    const token = localStorage.getItem('token');    
    try {
      if (token) {
        await axios.post('http://localhost:8000/api/logout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/signup'); 
    }
  };
  return (
    <>
        <Navbar  variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">CrowdFund</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/signup" className="custom-font">Login</Nav.Link>
            {/* <Nav.Link href="/signup" className="custom-font">Sign Up</Nav.Link> */}
            <Button className='btn btn-danger' onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
