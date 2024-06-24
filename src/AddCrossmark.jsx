import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const AddCrossmark = ({ onSave }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === "") {
      setIsInputEmpty(true);
    } else {
      onSave(trimmedValue);
      setInputValue("");
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
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de recibido A/M/D"
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
