const Header = () => {
  return (
    <>
      <>
        <div className="navbarr">
          <div className="hd1">
            <img src="/logo.png" />
            <a href="#">
              <h2>HARBINGER KEY</h2>
            </a>
          </div>
          <div className="hd2">
            <a href="javascript:void(0);" className="icon">
              <img src="/open-menu.png" alt="" />
            </a>
            <ul id="myLinks">
              <li>
                <a
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  target="_blank"
                >
                  DEVELOPERS
                </a>
              </li>
              <li>
                <a href="#comm">COMMUNITY</a>
              </li>
              <li>
                <a
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  target="_blank"
                >
                  WHITE PAPER
                </a>
              </li>
              <li className="mbibutton">
                {" "}
                <a href="#" target="_blank">
                  CONNECT WALLET
                </a>
              </li>
            </ul>
          </div>
          <div className="hd3">
            <a href="#" target="_blank">
              CONNECT WALLET
            </a>
          </div>
          <div className="clear" />
        </div>
      </>
    </>
  );
};

export default Header;
