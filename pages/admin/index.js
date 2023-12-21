import styles from "../../styles/loginPage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Login = () => {
  async function handleLogin() {}
  return (
    <>
      <div className={styles.mainSection}>
        <Form className={styles.loginForm} onSubmit={handleLogin}>
          <h3 className={styles.panelHeading}>HARBINGER ADMIN PANEL</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
          <Button className="mx-4" variant="secondary" type="reset">
            Reset
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
