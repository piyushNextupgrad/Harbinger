import styles from "../../styles/page.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  //states for GET API.....
  const [sliderContent, setsliderContent] = useState([]);
  const [post, setpost] = useState([]);
  const [section3, setsection3] = useState({});
  const [section4, setsection4] = useState({});
  //...............

  //states for section 1 post API
  const [pictureFiles, setPictureFiles] = useState("");
  const [keyName, setKeyName] = useState("");
  const [link, setLink] = useState("");
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  //................

  //states for section 2 post API
  const [authorNameSec2, setAuthorName] = useState("");
  const [articleHeadingSec2, setArticleHeading] = useState("");
  const [articleDescriptionSec2, setArticleDescription] = useState("");
  const [readMoreUrlSec2, setReadMoreUrl] = useState("");
  const [postImage, setPostImage] = useState(null);
  //.......
  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    // Handle file input change and update the state
    const files = event.target.files[0];

    setPictureFiles(files);
    // Display the preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(files);
  };
  const handleFileChange2 = (event) => {
    // Handle file input change and update the state
    const files = event.target.files[0];

    setPostImage(files);
    // Display the preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage2(reader.result);
    };
    reader.readAsDataURL(files);
  };

  //Function to get the data from API on Page Load
  async function getData() {
    try {
      setisSubmitingLoader(true);
      const slider = await axios.get("http://localhost:5000/section1/getData");

      setsliderContent(slider?.data?.data);
      const articles = await axios.get(
        "http://localhost:5000/articles/api/getArticle"
      );

      setpost(articles?.data?.data);
      console.log(articles?.data?.data);
      const section3 = await axios.get(
        "http://localhost:5000/section3/api/getSection3"
      );

      setsection3(section3?.data?.data);
      const section4 = await axios.get(
        "http://localhost:5000/section4/api/getSection4"
      );
      console.log("sec4", section4);
      setsection4(section4?.data?.data);
      setisSubmitingLoader(false);
    } catch (err) {
      setisSubmitingLoader(false);
      console.log(err);
    }
  }

  //function for delete API
  async function handleDelete(id, sectionName) {
    console.log(id);
    if (sectionName == "slider") {
      setisSubmitingLoader(true);
      const formData = new FormData();
      formData.append("id", id);
      const result = await axios.post(
        "http://localhost:5000/section1/delData",
        formData
      );
      console.log(result);
      if (result.data.success) {
        setisSubmitingLoader(false);
        const filteredSlider = sliderContent.filter((item) => item._id != id);
        setsliderContent(filteredSlider);
        toast.success("Record Deleted");
      } else {
        toast.error("Record Not Deleted");
      }
    }
    if (sectionName == "PostSection") {
      setisSubmitingLoader(true);
      const formData = new FormData();
      formData.append("id", id);

      const result = await axios.post(
        "http://localhost:5000/articles/api/delArticle",
        formData
      );
      // console.log(result);
      if (result.data.success) {
        const filteredPost = post.filter((item) => item._id != id);
        setpost(filteredPost);
        setisSubmitingLoader(false);
        toast.success("Record Deleted");
      } else {
        setisSubmitingLoader(false);
        toast.error("Record Not Deleted");
      }
    }
  }
  //function for post API
  async function sendData(event, section) {
    event.preventDefault();

    console.log("function hit");
    console.log(section);
    if (section == "slider") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("image1", pictureFiles);
        formData.append("keyName", keyName);
        formData.append("link", link);
        const resp = await axios.post(
          "http://localhost:5000/section1/postImages",
          formData
        );
        if (resp.data.success) {
          setisSubmitingLoader(false);
          getData();
          toast.success("Record Saved Successfuly");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setKeyName("");
          setLink("");
          setPictureFiles("");
          setPreviewImage(null);
        } else {
          setisSubmitingLoader(false);
          toast.success("Record Not Saved");
        }
      } catch (err) {
        toast.error(err);
      }
    } else if (section == "postSection") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("authorName", authorNameSec2);
        formData.append("postHeading", articleHeadingSec2);
        formData.append("postContent", articleDescriptionSec2);
        formData.append("articleMedia", postImage);
        formData.append("postLink", readMoreUrlSec2);
        const resp = await axios.post(
          "http://localhost:5000/articles/api/postArticle",
          formData
        );
        console.log("==>", resp);
        if (resp.data.success) {
          setisSubmitingLoader(false);
          getData();
          toast.success("Record Saved Successfuly");
          if (fileInputRef2.current) {
            fileInputRef2.current.value = "";
          }
          setAuthorName("");
          setArticleHeading("");
          setArticleDescription("");
          setReadMoreUrl("");
          setPostImage(null);
          setPreviewImage2(null);
        } else {
          setisSubmitingLoader(false);
          toast.success("Record Not Saved");
        }
      } catch (err) {
        toast.error(err);
      }
    }
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
        <section className={styles.main}>
          <div className={styles.hdr}>
            <img src={"/images/logo.png"} />
            <h2>Section 1 - Key Slider</h2>
          </div>
          <div className={styles.container}>
            <div>
              {sliderContent.length > 0 ? (
                <div className={styles.tableContainer}>
                  <Table
                    responsive
                    striped
                    bordered
                    hover
                    className={styles.tbl}
                  >
                    <thead className={styles.tbhead}>
                      <tr>
                        <th>S.No</th>
                        <th>Picture Uploaded</th>
                        <th>Key Heading</th>
                        <th>Key URL</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`${styles.tbb} ${styles.scrollableTable}`}
                    >
                      {sliderContent.map((item, index) => (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              className={styles?.tablePic}
                              src={item?.imagePath}
                            />
                          </td>
                          <td>{item?.keyName}</td>
                          <td>
                            <a href={item?.link} target="_blank">
                              {item?.link ? "View" : null}
                            </a>
                          </td>
                          <td>
                            <BiEdit className={styles.icon1} />
                            <BiSolidTrash
                              className={styles.icon2}
                              onClick={() => handleDelete(item?._id, "slider")}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : null}
            </div>
            <div className="py-5">
              <Form onSubmit={(e) => sendData(e, "slider")}>
                <Form.Group controlId="formFileMultiple" className="mt-4 mb-4">
                  <Form.Label>Upload Picture</Form.Label>
                  <div className="alignInputandPreview">
                    <Form.Control
                      type="file"
                      style={{ width: "70%" }}
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e)}
                      required
                    />
                    <img
                      className="previewImage"
                      src={previewImage == null ? "/no-img.jpg" : previewImage}
                      alt=""
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formText">
                  <Form.Label>Key Name</Form.Label>
                  <Form.Control
                    className="mb-5"
                    type="text"
                    placeholder="Key Heading"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="url">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    className="mb-5"
                    type="text"
                    placeholder="Type Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
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
            <img src={"/images/logo.png"} />
            <h2>Section 2 - Posts and Articles</h2>
          </div>
          <div className={styles.container}>
            <div>
              <div className={styles.tableContainer}>
                <Table responsive striped bordered hover className={styles.tbl}>
                  <thead className={styles.tbhead}>
                    <tr>
                      <th>S.No</th>
                      <th>Author</th>
                      <th>Picture Uploaded</th>
                      <th>Article Heading</th>
                      <th>Read More URL</th>
                      <th>Article Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tbb}>
                    {post.length > 0
                      ? post.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.authorName}</td>
                            <td>
                              <img
                                className={styles?.tablePic}
                                src={item?.postMedia}
                              />
                            </td>
                            <td>{item?.postHeading}</td>
                            <td>
                              <a href={item?.postLink} target="_blank">
                                View
                              </a>
                            </td>
                            <td>{item?.postContent}</td>
                            <td>
                              <BiEdit className={styles.icon1} />
                              <BiSolidTrash
                                className={styles.icon2}
                                onClick={() =>
                                  handleDelete(item?._id, "PostSection")
                                }
                              />
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="py-5">
              <Form onSubmit={(e) => sendData(e, "postSection")}>
                <Form.Group controlId="formFileMultiple" className="mb-2">
                  <Form.Label>Upload Picture</Form.Label>
                  <div className="alignInputandPreview mb-5">
                    <Form.Control
                      style={{ width: "70%" }}
                      ref={fileInputRef2}
                      type="file"
                      multiple
                      onChange={handleFileChange2}
                    />
                    <img
                      className="previewImage"
                      src={
                        previewImage2 == null ? "/no-img.jpg" : previewImage2
                      }
                      alt=""
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formText">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    className="mb-5"
                    size="lg"
                    type="text"
                    placeholder="Author Name"
                    value={authorNameSec2}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formText">
                  <Form.Label>Article Heading</Form.Label>
                  <Form.Control
                    className="mb-5"
                    size="lg"
                    type="text"
                    placeholder="Article Heading"
                    value={articleHeadingSec2}
                    onChange={(e) => setArticleHeading(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Article Content</Form.Label>
                  <br />
                  <Form.Control
                    className="mb-5"
                    as="textarea"
                    rows={3}
                    placeholder="Article...."
                    value={articleDescriptionSec2}
                    onChange={(e) => setArticleDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="url">
                  <Form.Label>Read More URL</Form.Label>
                  <Form.Control
                    className="mb-5"
                    type="text"
                    placeholder="Type URL"
                    value={readMoreUrlSec2}
                    onChange={(e) => setReadMoreUrl(e.target.value)}
                  />
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
            <img src={"/images/logo.png"} />
            <h2>Section 3</h2>
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
            <img src={"/images/logo.png"} />
            <h2>Section 4</h2>
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
