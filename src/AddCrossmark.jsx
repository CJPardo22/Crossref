import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const AddCrossmark = ({ onSave }) => {
  const [show, setShow] = useState(false);
  const [receivedDate, setReceivedDate] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleReceivedDateChange = (e) => {
    setReceivedDate(e.target.value);
  };

  const handleAcceptedDateChange = (e) => {
    setAcceptedDate(e.target.value);
  };

  const handlePublisedDateChange = (e) =>{
    setPublishedDate(e.target.value)
  }

  const handleSubmit = () => {
    const trimmedReceivedDate = receivedDate.trim();
    const trimmedAcceptedDate = acceptedDate.trim();
    const trimmedPublishedDate = publishedDate.trim();

    if (trimmedReceivedDate === "" || trimmedAcceptedDate === "" || trimmedAcceptedDate === "") {
      setIsInputEmpty(true);
    } else {
      onSave({
        receivedDate: trimmedReceivedDate,
        acceptedDate: trimmedAcceptedDate,
        publishedDate: trimmedPublishedDate,

      });
      setReceivedDate("");
      setAcceptedDate("");
      setPublishedDate("");
      setIsInputEmpty(false);
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
                isInvalid={isInputEmpty}
              />
              <Form.Control.Feedback type="invalid">
                El valor no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formCrossmarkAcceptedValue">
              <Form.Label>Fecha de aceptado:</Form.Label>
              <Form.Control
                type="date"
                value={acceptedDate}
                onChange={handleAcceptedDateChange}
                placeholder="Ingrese la fecha de aceptado A/M/D"
                isInvalid={isInputEmpty}
              />
              <Form.Control.Feedback type="invalid">
                El valor no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formCrossmarkPublisheddValue">
              <Form.Label>Fecha de publicado:</Form.Label>
              <Form.Control
                type="date"
                value={publishedDate}
                onChange={handlePublisedDateChange}
                placeholder="Ingrese la fecha de publicado A/M/D"
                isInvalid={isInputEmpty}
              />
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
