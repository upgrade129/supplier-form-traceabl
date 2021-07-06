import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Card,
  Input,
  Col,
  Collapse,
  Button,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";

export default function FormPage() {
  let { id } = useParams();
  console.log("params", id);

  const [page, setPage] = useState("cert"); //to keep track of certificate page and gallery page
  const [fireImg, setFireImg] = useState([]); //store the images
  const [imgFiles, setImgFiles] = useState([]); //store the images

  //input Fields for certificatesList with single field at start
  const [certificateList, setCertificateList] = useState([
    {
      name: "",
      type: "certificate",
      expiryDate: "",
      documentNo: "",
      issueDate: "",
      issuedBy: "",
      attachment: "",
      open: false,
    },
  ]);

  //handling input change
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...certificateList];
    list[index][name] = value;
    setCertificateList(list);
  };

  // toggling the accordion
  const handleClick = (index) => {
    const list = [...certificateList];
    list[index].open = !list[index].open;
    setCertificateList(list);
  };

  //removing a certificate input field
  const removeField = (index) => {
    const list = [...certificateList];
    list.splice(index, 1);
    setCertificateList(list);
  };

  //adding a new input field for certificate
  const addInput = () => {
    setCertificateList([
      [...certificateList],
      {
        name: "",
        type: "certificate",
        expiryDate: "",
        documentNo: "",
        issueDate: "",
        issuedBy: "",
        attachment: "",
        open: false,
      },
    ]);
  };

  //handling the uploaded files in gallery
  const handleAcceptedFiles = (files) => {
    files.map((file) => {
      const tempfireImg = [...fireImg];
      tempfireImg.push(file);
      setFireImg(tempfireImg);
      return null;
    });
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    var tempdata = [...imgFiles, ...files];
    setImgFiles(tempdata);
  };

  //formatting the size of file for display
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  //removing a single image from gallery
  const removeFile = (index) => {
    const tempfireImg = [...fireImg];
    tempfireImg.splice(index, 1);
    const tempdata = [...imgFiles];
    tempdata.splice(index, 1);
    setImgFiles(tempdata);
    setFireImg(tempfireImg);
  };

  //function to uploading certificate
  const uploadCert = (index) => {
    toast.success(`${certificateList[index].name} uploaded`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //function to uploading images
  const uploadImages = () => {
    toast.success("uploaded", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      {/* toast container for pop-up messages */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/*Nav bar for navingating through certificates and gallery */}
      <Card className="mt-3 shadow p-3">
        <Nav pills>
          <NavItem>
            <NavLink
              href="#"
              active={page === "cert"}
              onClick={() => setPage("cert")}
            >
              Certificates
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              active={page === "gallery"}
              onClick={() => setPage("gallery")}
            >
              Gallery
            </NavLink>
          </NavItem>
        </Nav>
      </Card>

      <Card className="mt-3 shadow p-3 container">
        {/*certificate page */}
        {page === "cert" && (
          <>
            {certificateList.map((val, id) => {
              return (
                <Card className="p-1 mt-3" key={id}>
                  {certificateList.length !== 1 && (
                    <>
                      <Button
                        style={{ width: "fit-content", marginLeft: "auto" }}
                        color=""
                        onClick={() => removeField(id)}
                      >
                        <span className="fa fa-times"></span>
                      </Button>
                    </>
                  )}
                  <Button
                    className="d-flex align-items-center mt-2"
                    color=""
                    onClick={() => handleClick(id)}
                  >
                    <p style={{ margin: 0 }}>
                      Certifcate {id + 1} {val.name && `- ${val.name}`}
                    </p>
                    <span
                      className="fa fa-arrow-down text-muted"
                      style={{ marginLeft: "auto" }}
                    ></span>
                  </Button>
                  <Collapse
                    isOpen={val.open}
                    className="mt-3 align-items-start"
                  >
                    <Form>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}name`} sm={2}>
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            id={`certificate${id}name`}
                            name="name"
                            value={val.name}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}type`} sm={2}>
                          Type
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            name="type"
                            id={`certificate${id}type`}
                            value={val.type}
                            onChange={(e) => handleInputChange(e, id)}
                          >
                            <option value="certificate">Certificate</option>
                            <option value="medium">medium</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}expiry`} sm={2}>
                          Expiry Date
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            name="expiryDate"
                            id={`certificate${id}expiry`}
                            value={val.expiryDate}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}docno`} sm={2}>
                          Document No
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            id={`certificate${id}docno`}
                            name="documentNo"
                            value={val.documentNo}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}issuedate`} sm={2}>
                          Issue Date
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="date"
                            name="issueDate"
                            id={`certificate${id}issuedate`}
                            value={val.issueDate}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}issuedby`} sm={2}>
                          Issued By
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            name="issuedBy"
                            id={`certificate${id}issuedby`}
                            value={val.issuedBy}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-2">
                        <Label htmlFor={`certificate${id}file`} sm={2}>
                          File
                        </Label>
                        <Col sm={10} className="d-flex justify-content-start">
                          <Input
                            type="file"
                            name="file"
                            id={`certificate${id}file`}
                            value={val.attachment}
                            onChange={(e) => handleInputChange(e, id)}
                          />
                        </Col>
                      </FormGroup>
                      <Button color="primary" onClick={() => uploadCert(id)}>
                        Upload
                      </Button>
                    </Form>
                  </Collapse>
                </Card>
              );
            })}
            <Button
              className="mt-3 mb-3"
              outline
              color="primary"
              style={{ width: "fit-content" }}
              onClick={() => addInput()}
            >
              Add New <span className="fa fa-plus"></span>
            </Button>
          </>
        )}

        {/*gallery page */}
        {page === "gallery" && (
          <>
            <Dropzone onDrop={(files) => handleAcceptedFiles(files)}>
              {({ getRootProps, getInputProps }) => (
                <Card style={{ height: "10rem" }} className="d-flex">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    {...getRootProps()}
                    style={{ cursor: "pointer", height: "100%", width: "100%" }}
                  >
                    <input {...getInputProps()} />
                    <i className="fa fa-lg fa-cloud-upload"></i>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </Card>
              )}
            </Dropzone>
            {imgFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border"
                  key={i + "-file"}
                >
                  <Button
                    style={{ width: "fit-content" }}
                    className="align-self-end"
                    color=""
                    onClick={() => removeFile(i)}
                  >
                    <span className="fa fa-times m-1"></span>
                  </Button>
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="rounded bg-light"
                          alt={f.name}
                          src={f.preview}
                        />
                      </Col>
                      <Col>
                        <Link to="#" className="text-muted font-weight-bold">
                          {f.name}
                        </Link>
                        <p className="mb-0">
                          <strong>{f.formattedSize}</strong>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
            {imgFiles.length !== 0 && (
              <Button
                style={{ width: "fit-content" }}
                className="mt-2"
                color="primary"
                onClick={uploadImages}
              >
                Upload
              </Button>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
