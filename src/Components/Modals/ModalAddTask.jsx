import { useRef } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import style from "./AddTask.module.css";
import { createRef } from "react";

const ModalAddTask = ({getValueAddTask, handleCloseModal}) => {
  
  const form = useRef(null);
  const inputRef = createRef();

  const passValue = () => {
    // const {username, email, text} = state;
    // if( !username || !email || !text )
    // return;
    const data = new FormData(form.current);
    getValueAddTask(data);
  }

  return (
    <Modal show={true}  onHide={() => handleCloseModal("isModalAddTask")}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form}>
          <InputGroup className="mb-3">
            <Form.Control 
              name= "username"
              type="text" 
              placeholder="Name"
              onKeyPress={({key}) => key === "Enter" ? passValue() : ""}
              ref={inputRef}
            /> 
          </InputGroup>
          <InputGroup>
            <Form.Control
              name= "email" 
              type="email" 
              placeholder="Email"
              className={style.textarea}
            />
          </InputGroup>
          <InputGroup className="mt-3">
            <Form.Control
                name= "text" 
                type='text' 
                placeholder="Text"
                className={style.textarea}
              />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={() => handleCloseModal("isModalAddTask")}
        >Close
        </Button>
        <Button 
            className="ml-3"
            onClick={passValue}
        >
            Add
        </Button>
      </Modal.Footer>
  </Modal>
  )
}

export default ModalAddTask;