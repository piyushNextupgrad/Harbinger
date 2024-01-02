import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  return (
    <>
      <Navbar id="customNavBar" expand="lg" className="navbarr">
        <Container id="menuContainerCustomClass">
          <Navbar.Brand className="hd1" href="/">
            <img
              className="BrandLogoHarbinger"
              src="/images/logo.png"
              alt="harbinger logo"
            />
            <span className="logoText">HARBINGER KEY</span>
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-light shadow-none"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="navSubItem" className="me-auto">
              <div className="navMenuItemsInner">
                <Nav.Link
                  className="actualLink"
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  target="_blank"
                >
                  DEVELOPERS
                </Nav.Link>
                <Nav.Link className="actualLink" href="#comm">
                  COMMUNITY
                </Nav.Link>
                <Nav.Link
                  id="actualLink"
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  target="_blank"
                >
                  WHITE PAPER
                </Nav.Link>
              </div>
              <div className="hd3">
                <Nav.Link>CONNECT WALLET</Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
