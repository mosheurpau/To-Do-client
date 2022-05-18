import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import "./Header.css";
import CustomLink from "../../CustomLink/CustomLink";

const Header = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="https://i.ibb.co/Cs2fm2b/todo.jpg"
            width="70"
            height="70"
            className="d-inline-block align-center nav-logo"
          />{" "}
          <b className="logo-title">
            <span style={{ color: "#EB7700" }}>To</span> Do
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={CustomLink} to="Addtask">
              Add Task
            </Nav.Link>
            <Nav.Link as={CustomLink} to="task">
              My Task
            </Nav.Link>
            <Nav.Link>
              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="link"
                  className="text-decoration-none"
                  style={{ color: "#EB7700" }}
                >
                  <b>Log Out</b>
                </Button>
              ) : (
                <Nav.Link className="my-auto" as={CustomLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
