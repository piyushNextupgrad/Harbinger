import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
const Header2 = () => {
  const [name, setname] = useState({});
  const router = useRouter();
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user"));
    if (username) {
      setname(username);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    router.push("/admin");
  }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className=" mb-3 navbarr2">
          <Container fluid>
            <Navbar.Brand href="/admin/Dashboard">
              <div className="headerSec1">
                <div>
                  <img
                    className="BrandLogoHarbinger"
                    src="/images/logo.png"
                    alt=""
                  />
                  <h4>HARBINGER ADMIN PANEL</h4>
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle
              className="shadow-none bg-light"
              aria-controls={`offcanvasNavbar-expand-${expand}`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="OffCanvasBodyBlur"
            >
              <Offcanvas.Header closeButton className="custom-close-button">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h6>
                    <img
                      className="offCanvasLogo"
                      src="/images/logo.png"
                      alt=""
                    />
                    {name.name}
                    <span
                      style={{
                        color: "#00FF00",
                        fontSize: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      &bull;
                    </span>
                  </h6>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* <Nav.Link className="OffCanvasLinks" href="#section1">
                    Section 1
                  </Nav.Link>
                  <Nav.Link className="OffCanvasLinks" href="#section2">
                    Section 2
                  </Nav.Link>
                  <Nav.Link className="OffCanvasLinks" href="#section3">
                    Section 3
                  </Nav.Link>
                  <Nav.Link className="OffCanvasLinks" href="#section4">
                    Section 4
                  </Nav.Link> */}
                  <button className="my-4 logOutbtn" onClick={handleLogout}>
                    Logout
                  </button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header2;
