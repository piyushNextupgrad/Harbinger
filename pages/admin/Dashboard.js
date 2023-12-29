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
import Modal1 from "@/components/SliderModal";
import Modal2 from "@/components/section2Modal";

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

  //states for section 3 put API
  const [beforeHeadingText, setBeforeHeadingText] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [button1Url, setButton1Url] = useState("");
  const [button2Url, setButton2Url] = useState("");
  //......

  //states for section 4 put API
  const [beforeHeadingText2, setBeforeHeadingText2] = useState("");
  const [headingText2, setHeadingText2] = useState("");
  const [description2, setDescription2] = useState("");
  const [buttonUrl2, setButtonUrl2] = useState("");
  //..............................

  //states to toggle modal....
  const [toggle1, settoggle1] = useState(0);
  const [SliderItem, setSliderItem] = useState([]);
  const [field1, setfield1] = useState("");
  const [field2, setfield2] = useState("");
  const [field3, setfield3] = useState("");
  const [fieldId, setfieldID] = useState("");
  //....

  //states for second  modal

  const [toggle2, settoggle2] = useState(0);
  const [postItem, setPostItem] = useState([]);
  const [pic, setpic] = useState("");
  const [authName, setauthName] = useState("");
  const [artHeading, setartHeading] = useState("");
  const [artContent, setartContent] = useState("");
  const [artLink, setartLink] = useState("");
  const [postId, setPostId] = useState("");

  //.........

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

  //Function for GET API
  async function getData() {
    try {
      setisSubmitingLoader(true);
      const slider = await axios.get(
        "https://harbinger-backend.onrender.com/section1/getData"
      );

      setsliderContent(slider?.data?.data);
      const articles = await axios.get(
        "https://harbinger-backend.onrender.com/articles/api/getArticle"
      );

      setpost(articles?.data?.data);
      // console.log(articles?.data?.data);
      const section3 = await axios.get(
        "https://harbinger-backend.onrender.com/section3/api/getSection3"
      );

      setsection3(section3?.data?.data);
      // console.log("section 3", section3?.data?.data);
      setBeforeHeadingText(section3?.data?.data[0].sectionName);
      setHeadingText(section3?.data?.data[0].sectionHeading);
      setParagraph1(section3?.data?.data[0].sectionContent1);
      setParagraph2(section3?.data?.data[0].sectioncontent2);
      setButton1Url(section3?.data?.data[0].link1);
      setButton2Url(section3?.data?.data[0].link2);

      const section4 = await axios.get(
        "https://harbinger-backend.onrender.com/section4/api/getSection4"
      );
      // console.log("sec4", section4);
      setsection4(section4?.data?.data);
      setBeforeHeadingText2(section4?.data?.data[0].sectionName);
      setHeadingText2(section4?.data?.data[0].sectionHeading);
      setDescription2(section4?.data?.data[0].sectionContent1);
      setButtonUrl2(section4?.data?.data[0].link1);
      setisSubmitingLoader(false);
    } catch (err) {
      setisSubmitingLoader(false);
      console.log(err);
    }
  }

  //function for delete API
  async function handleDelete(id, sectionName) {
    // console.log(id);
    if (sectionName == "slider") {
      setisSubmitingLoader(true);
      const formData = new FormData();
      formData.append("id", id);
      const result = await axios.post(
        "https://harbinger-backend.onrender.com/section1/delData",
        formData
      );
      // console.log(result);
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
        "https://harbinger-backend.onrender.com/articles/api/delArticle",
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

    // console.log("function hit");
    // console.log(section);
    if (section == "slider") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("image1", pictureFiles);
        formData.append("keyName", keyName);
        formData.append("link", link);
        const resp = await axios.post(
          "https://harbinger-backend.onrender.com/section1/postImages",
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
          "https://harbinger-backend.onrender.com/articles/api/postArticle",
          formData
        );
        // console.log("==>", resp);
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
    } else if (section == "section4") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("sectionName", beforeHeadingText);
        formData.append("sectionHeading", headingText);
        formData.append("sectionContent1", paragraph1);
        formData.append("sectioncontent2", paragraph2);
        formData.append("link1", button1Url);
        formData.append("link2", button2Url);
        const resp = await axios.post(
          "https://harbinger-backend.onrender.com/section3/api/postSection3",
          formData
        );
        // console.log("==>", resp);
        if (resp.data.success) {
          setisSubmitingLoader(false);
          getData();
          toast.success("Record Saved Successfuly");

          setBeforeHeadingText("");
          setHeadingText("");
          setParagraph1("");
          setParagraph2("");
          setButton1Url("");
          setButton2Url("");
        } else {
          setisSubmitingLoader(false);
          toast.error("Record Not Saved");
        }
      } catch (err) {
        toast.error(err);
      }
    }
  }

  //function for UPdate API
  async function updateData(event, sectionName, sectionID) {
    event.preventDefault();
    if (sectionName == "section3") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("sectionName", beforeHeadingText);
        formData.append("sectionHeading", headingText);
        formData.append("sectionContent1", paragraph1);
        formData.append("sectioncontent2", paragraph2);
        formData.append("link1", button1Url);
        formData.append("link2", button2Url);
        formData.append("id", sectionID);
        const res = await axios.put(
          "https://harbinger-backend.onrender.com/section3/api/putSection3",
          formData
        );
        // console.log("res", res);
        if (res.data.success) {
          getData();
          setisSubmitingLoader(false);

          toast.success("Records Updated");
        } else {
          setisSubmitingLoader(false);
          toast.error("Records updated failed");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
      }
    }
    if (sectionName == "section4") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        formData.append("sectionName", beforeHeadingText2);
        formData.append("sectionHeading", headingText2);
        formData.append("sectionContent1", description2);

        formData.append("link1", buttonUrl2);

        formData.append("id", sectionID);
        const res = await axios.put(
          "https://harbinger-backend.onrender.com/section4/api/putSection4",
          formData
        );
        // console.log("res", res);
        if (res.data.success) {
          getData();
          setisSubmitingLoader(false);

          toast.success("Records Updated");
        } else {
          setisSubmitingLoader(false);
          toast.error("Records updated failed");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
      }
    }
  }

  async function handleSliderUpdate(itemId) {
    // console.log("sliderItem", itemId);
    const filteredItem = sliderContent.filter((item) => item._id == itemId);
    setSliderItem(filteredItem[0]);
    setfield1(filteredItem[0]?.imagePath);
    setfield2(filteredItem[0]?.keyName);
    setfield3(filteredItem[0]?.link);
    setfieldID(filteredItem[0]?._id);
    settoggle1(1);
  }
  async function handlePostUpdate(itemId) {
    // console.log("Post Item", itemId);
    const filteredItem = post.filter((item) => item._id == itemId);

    setSliderItem(filteredItem[0]);
    setpic(filteredItem[0]?.postMedia);
    setauthName(filteredItem[0]?.authorName);
    setartHeading(filteredItem[0]?.postHeading);
    setartContent(filteredItem[0]?.postContent);
    setartLink(filteredItem[0]?.postLink);
    setPostId(filteredItem[0]?._id);

    settoggle2(1);
  }

  useEffect(() => {
    // console.log("SliderItem", SliderItem);
  }, [SliderItem]);

  return (
    <>
      <Modal1
        toggle1={toggle1}
        settoggle1={settoggle1}
        SliderItem={SliderItem}
        setSliderItem={setSliderItem}
        field1={field1}
        field2={field2}
        field3={field3}
        fieldId={fieldId}
        setfield1={setfield1}
        setfield2={setfield2}
        setfield3={setfield3}
        getData={getData}
        setisSubmitingLoader={setisSubmitingLoader}
      />
      <Modal2
        toggle2={toggle2}
        settoggle2={settoggle2}
        postItem={postItem}
        pic={pic}
        authName={authName}
        artHeading={artHeading}
        artContent={artContent}
        artLink={artLink}
        postId={postId}
        setPostItem={setPostItem}
        setpic={setpic}
        setauthName={setauthName}
        setartHeading={setartHeading}
        setartContent={setartContent}
        setartLink={setartLink}
        getData={getData}
        setisSubmitingLoader={setisSubmitingLoader}
      />
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
                              {item?.link}
                            </a>
                          </td>
                          <td>
                            <BiEdit
                              className={styles.icon1}
                              onClick={() => handleSliderUpdate(item?._id)}
                            />
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
                <Form.Group className="mb-2" controlId="formTextSection1">
                  <Form.Label>Key Name</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="text"
                    placeholder="Key Heading"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="urlSection1">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    className=""
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
                                {item?.postLink}
                              </a>
                            </td>
                            <td>{item?.postContent}</td>
                            <td>
                              <BiEdit
                                className={styles.icon1}
                                onClick={() => handlePostUpdate(item?._id)}
                              />
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
                <Form.Group controlId="formFileMultipleSec2" className="mb-2">
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
                <Form.Group className="mb-4" controlId="formTextSec2">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Author Name"
                    value={authorNameSec2}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formTextSec2">
                  <Form.Label>Article Heading</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Article Heading"
                    value={articleHeadingSec2}
                    onChange={(e) => setArticleHeading(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="ControlTextarea1">
                  <Form.Label>Article Content</Form.Label>
                  <br />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Article...."
                    value={articleDescriptionSec2}
                    onChange={(e) => setArticleDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="urlSec2">
                  <Form.Label>Read More URL</Form.Label>
                  <Form.Control
                    className="mb-3"
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
            <Form onSubmit={(e) => updateData(e, "section3", section3[0]._id)}>
              <Form.Group className="mb-4" controlId="formTextSec3">
                <Form.Label>Before Heading Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Heading 1"
                  value={beforeHeadingText}
                  onChange={(e) => setBeforeHeadingText(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formTextSec3">
                <Form.Label>Heading Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Heading 2"
                  value={headingText}
                  onChange={(e) => setHeadingText(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="ControlTextarea1Sec3">
                <Form.Label>Content 1</Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph 1"
                  value={paragraph1}
                  onChange={(e) => setParagraph1(e.target.value)}
                />
                <br />
                <Form.Label>Content 2</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph 2"
                  value={paragraph2}
                  onChange={(e) => setParagraph2(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="urlSec3">
                <Form.Label>Button1 URL</Form.Label>
                <Form.Control
                  className="mb-4"
                  type="text"
                  placeholder="Type URL1"
                  value={button1Url}
                  onChange={(e) => setButton1Url(e.target.value)}
                />
                <Form.Label>Button2 URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type URL2"
                  value={button2Url}
                  onChange={(e) => setButton2Url(e.target.value)}
                />
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
            <Form onSubmit={(e) => updateData(e, "section4", section4[0]._id)}>
              <Form.Group
                className="mb-2"
                controlId="formBeforeHeadingTextSec4"
              >
                <Form.Label>Before Heading Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="INTAKE..."
                  value={beforeHeadingText2}
                  onChange={(e) => setBeforeHeadingText2(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formHeadingTextSec4">
                <Form.Label>Heading Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Community..."
                  value={headingText2}
                  onChange={(e) => setHeadingText2(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formDescriptionSec4">
                <Form.Label>Description</Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Paragraph..."
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formButtonUrlSec4">
                <Form.Label>Button URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type URL..."
                  value={buttonUrl2}
                  onChange={(e) => setButtonUrl2(e.target.value)}
                />
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
