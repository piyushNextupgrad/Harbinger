import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "sonner";
import axios from "axios";
const Modal1 = ({
  toggle1,
  settoggle1,
  SliderItem,
  setSliderItem,
  field1,
  field2,
  field3,
  setfield1,
  setfield2,
  setfield3,
  fieldId,
  getData,
  setisSubmitingLoader,
}) => {
  const [show, setShow] = useState(false);

  //form handling states
  const [imagePreview, setImagePreview] = useState(null);

  //...

  const handleClose = () => {
    setImagePreview(null);
    setfield1("");
    setfield2("");
    setfield3("");
    setShow(false);
    settoggle1(0);
  };
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    // Handle file input change and update the state
    const files = event.target.files[0];

    setfield1(files);
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
    // console.log("image type", typeof field1);
    if (section == "slider") {
      try {
        setisSubmitingLoader(true);
        const formData = new FormData();

        const checkType = typeof field1;
        if (checkType != "string") {
          formData.append("image1", field1);
        }
        formData.append("keyName", field2);
        formData.append("link", field3);
        formData.append("id", fieldId);
        const resp = await axios.put(
          "https://harbinger-backend.onrender.com/section1/putData",
          formData
        );
        if (resp.data.success) {
          setisSubmitingLoader(false);
          // console.log("Saved");
          // console.log(resp);
          handleClose();
          toast.success("Record Updated");
          getData();
          // if (fileInputRef.current) {
          //   fileInputRef.current.value = "";
          // }
          // setKeyName("");
          // setLink("");
          // setPictureFiles("");
          // setPreviewImage(null);
        } else {
          setisSubmitingLoader(false);
          // setisSubmitingLoader(false);
          // toast.success("Record Not Saved");
          toast.error("Record Not Updated");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
        toast.error("Record Not Updated");
      }
    }
  }

  //..........

  useEffect(() => {
    if (toggle1) {
      handleShow();
    } else {
      handleClose();
    }
  }, [toggle1]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Section 1 Record Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => sendData(e, "slider")}>
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
                  src={imagePreview == null ? field1 : imagePreview}
                  alt=""
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formTextSection1">
              <Form.Label>Key Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Key Heading"
                value={field2}
                onChange={(e) => setfield2(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="urlSection1">
              <Form.Label>Link</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Type Link"
                value={field3}
                onChange={(e) => setfield3(e.target.value)}
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

export default Modal1;
