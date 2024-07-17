import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const AddCrossmark = ({ onSave }) => {
  const [show, setShow] = useState(false);
  const [receivedDate, setReceivedDate] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [contentType, setContentType] = useState("Artitle");
  const [isPublishedDateEmpty, setIsPublishedDateEmpty] = useState(false);

  const handleReceivedDateChange = (e) => {
    setReceivedDate(e.target.value);
  };

  const handleAcceptedDateChange = (e) => {
    setAcceptedDate(e.target.value);
  };

  const handlePublisedDateChange = (e) => {
    setPublishedDate(e.target.value);
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedPublishedDate = publishedDate.trim();

    if (trimmedPublishedDate === "") {
      setIsPublishedDateEmpty(true);
    } else {
      onSave({
        receivedDate: receivedDate.trim(),
        acceptedDate: acceptedDate.trim(),
        publishedDate: trimmedPublishedDate,
        contentType: contentType,
      });
      setReceivedDate("");
      setAcceptedDate("");
      setPublishedDate("");
      setContentType("Article");
      setIsPublishedDateEmpty(false);
      setShow(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setIsInputEmpty(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agregar Crossmark
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Valor del Crossmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCrossmarkValue">
              <Form.Label>Fecha de recibido:</Form.Label>
              <Form.Control
                type="date"
                value={receivedDate}
                onChange={handleReceivedDateChange}
                placeholder="Ingrese la fecha de recibido A/M/D"
              />
            </Form.Group>
            <Form.Group controlId="formCrossmarkAcceptedValue">
              <Form.Label>Fecha de aceptado:</Form.Label>
              <Form.Control
                type="date"
                value={acceptedDate}
                onChange={handleAcceptedDateChange}
                placeholder="Ingrese la fecha de aceptado A/M/D"
              />
            </Form.Group>
            <Form.Group controlId="formCrossmarkPublisheddValue">
              <Form.Label>Fecha de publicado:</Form.Label>
              <Form.Control
                type="date"
                value={publishedDate}
                onChange={handlePublisedDateChange}
                placeholder="Ingrese la fecha de publicado A/M/D"
                isInvalid={isPublishedDateEmpty}
              />
              <Form.Control.Feedback type="invalid">
                El valor no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCrossmarkContentType">
              <Form.Label>Tipo de contenido:</Form.Label>
              <Form.Select
                value={contentType}
                onChange={handleContentTypeChange}
              >
                <option value="Article">Article</option>
                <option value="Review">Reseña</option>
                <option value="Editorial">Editorial</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                El valor no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
