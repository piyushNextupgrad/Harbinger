import styles from "../../styles/page.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <div className={styles.harb}>
        <section className={styles.main}>
          <div className={styles.hdr}>
            <h2>KEY Header & Button Links</h2>
          </div>
          <div className={styles.container}>
            <div>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Picture Uploaded</th>
                    <th>Key Heading</th>
                    <th>Key URL</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>
                      <img src="/user.png" />
                    </td>
                    <td>Key 1</td>
                    <td>
                      <a href="https://www.key1.com/">https://www.key1.com/</a>
                    </td>
                    <td>
                      <BiEdit className={styles.icon1} />
                      <BiSolidTrash className={styles.icon2} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Form>
                <Form.Group controlId="formFileMultiple" className="mb-2">
                  <Form.Label>Upload Picture</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formText">
                  <Form.Label>Key Name</Form.Label>
                  <Form.Control type="text" placeholder="Key Heading" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="url">
                  <Form.Label>Button URL</Form.Label>
                  <Form.Control type="url" placeholder="Type URL" />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.fbtn}>
                  Update Site
                </Button>
              </Form>
            </div>
          </div>
        </section>
        <section className={styles.main}>
          <div className={styles.hdr}>
            <h2>Articles Header & Button Links</h2>
          </div>
          <div className={styles.container}>
            <div>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Picture Uploaded</th>
                    <th>Article Heading</th>
                    <th>Read More URL</th>
                    <th>Article Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nikhil</td>
                    <td>
                      <img src="/user.png" />
                    </td>
                    <td>Article 1</td>
                    <td>
                      <a href="https://www.article1.com/">
                        https://www.article1.com/
                      </a>
                    </td>
                    <td>qwertyuiopasdfghjklzxcvbnm</td>
                    <td>
                      <BiEdit className={styles.icon1} />
                      <BiSolidTrash className={styles.icon2} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Form>
                <Form.Group controlId="formFileMultiple" className="mb-2">
                  <Form.Label>Upload Picture</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formText">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Author Name"
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formText">
                  <Form.Label>Article Heading</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Article Heading"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Article Description</Form.Label>
                  <br />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Article...."
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="url">
                  <Form.Label>Read More URL</Form.Label>
                  <Form.Control type="url" placeholder="Type URL" />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.fbtn}>
                  Update Site
                </Button>
              </Form>
            </div>
          </div>
        </section>
        <section className={styles.main}>
          <div className={styles.hdr}>
            <h2>Shiboshis Text & Button Links</h2>
          </div>
          <div className={styles.container}>
            <Form>
              <Form.Group className="mb-2" controlId="formText">
                <Form.Label>Before Heading Text</Form.Label>
                <Form.Control type="text" placeholder="NFT..." />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formText">
                <Form.Label>Heading Text</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Shiboshis..."
                />
              </Form.Group>
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph 1"
                />
                <br />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph 2"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="url">
                <Form.Label>Button1 URL</Form.Label>
                <Form.Control type="url" placeholder="Type URL1" />
                <Form.Label>Button2 URL</Form.Label>
                <Form.Control type="url" placeholder="Type URL2" />
              </Form.Group>
              <Button variant="primary" type="submit" className={styles.fbtn}>
                Update Site
              </Button>
            </Form>
          </div>
        </section>
        <section className={styles.main}>
          <div className={styles.hdr}>
            <h2>Community Text & Button Links</h2>
          </div>
          <div className={styles.container}>
            <Form>
              <Form.Group className="mb-2" controlId="formText">
                <Form.Label>Before Heading Text</Form.Label>
                <Form.Control type="text" placeholder="INTAKE..." />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formText">
                <Form.Label>Heading Text</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Community..."
                />
              </Form.Group>
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph..."
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="url">
                <Form.Label>Button URL</Form.Label>
                <Form.Control type="url" placeholder="Type URL..." />
              </Form.Group>
              <Button variant="primary" type="submit" className={styles.fbtn}>
                Update Site
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
