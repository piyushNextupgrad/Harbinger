import styles from "../../styles/loginPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "sonner";
import { useRouter } from "next/router";
const Login = () => {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/Dashboard");
    }
  }, []);
  async function handleLogin(e) {
    e.preventDefault();
    if (email != "" && password != "") {
      try {
        setisSubmitingLoader(true);
        const result = await axios.post(
          "https://harbinger-backend.onrender.com/user/api/findUser",
          { email: email, password: password }
        );
        console.log("data", result);
        if (result.data.data.length > 0) {
          toast.success("Login Successful");
          setemail("");
          setpassword("");
          const token = result?.data?.token;
          const user = JSON.stringify(result?.data?.data[0]);
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          router.push("/admin/Dashboard");
        } else {
          setisSubmitingLoader(false);
          toast.error("Wrong username or password");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
      }
    } else {
      toast.warning("Both email and password are required to login.");
    }
  }
  function resetForm() {
    setemail("");
    setpassword("");
  }
  return (
    <>
      <div className={styles.mainSection}>
        {isSubmitingLoader ? (
          <div className="overlay">
            <div className="spinner-container">
              <Spinner
                className="loaderSpinnerPiyush"
                style={{
                  width: "100px",
                  height: "100px",
                  color: "#0a1c51fc",
                }}
                animation="border"
              />
            </div>
          </div>
        ) : null}
        <Form className={styles.loginForm} onSubmit={handleLogin}>
          <h3 className={styles.panelHeading}>HARBINGER ADMIN PANEL</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.label}>Email address</Form.Label>
            <Form.Control
              className={styles.input}
              type="email"
              value={email}
              placeholder="Enter email"
              required
              onChange={(e) => setemail(e?.target?.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.label}>Password</Form.Label>
            <Form.Control
              className={styles.input}
              type="password"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setpassword(e?.target?.value)}
            />
          </Form.Group>

          <Button
            className="btn-sm btn-shrink"
            variant="secondary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="mx-4 btn-sm  btn-shrink"
            variant="secondary"
            onClick={resetForm}
          >
            Reset
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
