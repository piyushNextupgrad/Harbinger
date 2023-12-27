import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
      <>
        <div className="navbarr2">
          <div className="headerSec1">
            <div>
              <img src="/images/logo.png" alt="" />
              <h4>HARBINGER ADMIN PANEL</h4>
            </div>
            <div>
              <h6>{name.name}</h6>
              <button className=" logOutbtn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Header2;
