import { Container, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import style from "./Task.module.css";

const statuses = [
    { value: 'Задача не выполнена', key: 0 },
    { value: 'Задача не выполнена, отредактирована админом', key: 1 },
    { value: 'Задача выполнена', key: 10 },
    { value: 'Задача отредактирована админом и выполнена', key: 11 }
  ]

function Task({task, handleOpenEditTaskModal, token}){

    let status = '';
    for(let obj of statuses){
      if(task.status === obj.key) status = obj.value;
    }

    return (
        <Container className={style.container}>
            <Row className= {style.name} >
                Name: {task.username}
            </Row>
            <Row className={style.row}>
                Email: {task.email}
            </Row>
            <Row className={style.row}>
                Text: {task.text}
            </Row>
            <Row className={style.row}>
                Status: {status}
            </Row>
            <Row className={style.buttonRow}>
               {
                !token || <Button 
                            onClick= {() => handleOpenEditTaskModal(task)} 
                            variant="danger" 
                            className={style.button}
                            >
                            <FontAwesomeIcon icon={faEdit} />
                         </Button> 
                }
            </Row>
        </Container>
    )
}

export default Task;