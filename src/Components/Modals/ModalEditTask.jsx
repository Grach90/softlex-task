import {Modal, Button, Form, InputGroup, DropdownButton, Dropdown} from "react-bootstrap";
import style from "./AddTask.module.css";
import {connect} from 'react-redux';
import types from '../../Redux/actionTypes';

const statuses = [
  { value: 'Задача не выполнена', key: 0 },
  { value: 'Задача не выполнена, отредактирована админом', key: 1 },
  { value: 'Задача выполнена', key: 10 },
  { value: 'Задача отредактирована админом и выполнена', key: 11 }
]

const ModalEditTask = (props) => {
  
  const { 
    //from ToDo
    editableTask,
    handleCloseModal,
    handleEditTask,
    //from reducer
    handleChange,
    onChangeDropdown,
    text,
    status  
  } = props;
 

  const handleEditableTask = () => {
    let statusCode = '';
    for(let obj of statuses){
      if(status === obj.value) statusCode = obj.key;
    }
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('token', token);
    data.append('status', statusCode);
    data.append('text', text);

    handleEditTask(data, editableTask.id);
  }

  const statusJSX = statuses.map((status, i) => {
    return (
        <Dropdown.Item key={i} onClick={() => onChangeDropdown(status.value)} >
            {status.value}
        </Dropdown.Item>
      )
  })

    return (
      <Modal  show={true} onHide={() => handleCloseModal("isModalEditTask")}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              name= "text" 
              as="textarea" 
              placeholder='Text'
              className={style.textarea}
              value= {text}
              onChange={handleChange}
            />
            </InputGroup>
            <InputGroup>
            <DropdownButton 
                className={style.buttons} 
                variant="info"
                title={status || 'Status'}
                >
                    {statusJSX}
                </DropdownButton>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => handleCloseModal("isModalEditTask")}
          >
            Close
          </Button>
          <Button 
              className="ml-3"
              onClick={handleEditableTask}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

const mapStateToProps = (state) => {
  return {
    ...state.editTaskState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) =>  dispatch({type: types.HANDLE_CHANGE_MODAL, e}),
    onChangeDropdown: (data) => dispatch({type: types.ONCHANGE_DROPDOWN, data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTask);