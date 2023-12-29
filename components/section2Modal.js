import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "sonner";
import axios from "axios";
const Modal2 = ({
  toggle2,
  settoggle2,
  postItem,
  pic,
  authName,
  artHeading,
  artContent,
  artLink,
  setPostItem,
  setpic,
  setauthName,
  setartHeading,
  setartContent,
  setartLink,
  postId,
  getData,
  setisSubmitingLoader,
}) => {
  const [show, setShow] = useState(false);

  //form handling states
  const [imagePreview, setImagePreview] = useState(null);

  //...

  const handleClose = () => {
    setImagePreview(null);
    setpic("");
    setauthName("");
    setartHeading("");
    setartContent("");
    setartLink("");
    setShow(false);
    settoggle2(0);
  };
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    // Handle file input change and update the state
    const files = event.target.files[0];

    setpic(files);
    // Display the preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(files);
  };

  //function to update Data
  async function sendData(event, section) {
    event.preventDefault();

    // console.log("function hit");
    // console.log(section);

    if (section == "postSection") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();
        const getType = typeof pic;
        if (getType != "string") {
          formData.append("articleMedia", pic);
        }
        formData.append("authorName", authName);
        formData.append("postHeading", artHeading);
        formData.append("postContent", artContent);

        formData.append("postLink", artLink);
        formData.append("id", postId);
        const resp = await axios.put(
          "https://harbinger-backend.onrender.com/articles/api/putArticle",
          formData
        );
        // console.log("==>", resp);
        if (resp.data.success) {
          handleClose();
          getData();
          toast.success("Record Saved Successfuly");
          setisSubmitingLoader(false);
        } else {
          setisSubmitingLoader(false);
          toast.error("Record Not Saved");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        toast.error(err);
      }
    }
  }

  //..........

  useEffect(() => {
    if (toggle2) {
      handleShow();
    } else {
      handleClose();
    }
  }, [toggle2]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Section 2 Record Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => sendData(e, "postSection")}>
            <Form.Group controlId="formFileMultiple" className="">
              <Form.Label>Upload Picture</Form.Label>
              <div className="alignInputandPreview">
                <Form.Control
                  type="file"
                  style={{ width: "60%" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <img
                  className="previewImage2"
                  src={imagePreview == null ? pic : imagePreview}
                  alt=""
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formTextSection1">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Key Heading"
                value={authName}
                onChange={(e) => setauthName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="updateTextSection2">
              <Form.Label>Article Heading</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Key Heading"
                value={artHeading}
                onChange={(e) => setartHeading(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="updateTextSection2">
              <Form.Label>Article Content</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Key Heading"
                value={artContent}
                onChange={(e) => setartContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="urlSection1">
              <Form.Label>Link</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Type Link"
                value={artLink}
                onChange={(e) => setartLink(e.target.value)}
              />
            </Form.Group>
            <Button
              className="mt-4 mx-2"
              style={{ float: "right" }}
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>

            <Button
              className="mt-4 mx-2"
              style={{ float: "right" }}
              variant="warning"
              type="submit"
            >
              Update Record
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal2;
