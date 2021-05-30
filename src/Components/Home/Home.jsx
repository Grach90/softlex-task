import { connect } from "react-redux";
import {useEffect} from "react";
import Task from "../Task/Task";
import {Row, Col, Button, DropdownButton, Dropdown} from "react-bootstrap";
import ModalAddTaskWithRedux from "../Modals/ModalAddTask";
import ModalEditTask from '../Modals/ModalEditTask';
import Spiner from '../Spiner/Spiner';
import style from './home.module.css';
import types from '../../Redux/actionTypes';
import {handleEditTaskThunk, addTaskThunk, useEffectTrunk, sortThunk } from '../../Redux/action';
import Paginations from '../Pagination/Paginations';

const sort_fields = [
  {
    value:'id'
  },
  {
    value:'username '
  },
  {
    value:'email '
  },
  {
    value:'status'
  }
];

const sort_directions = [
  {
    value: 'asc '
  },
  {
    value: 'desc'
  }
]


const Home = (props) => {
  let {state: {
    tasks,
    isModalAddTask, 
    isModalEditTask, 
    loading,
    editTask,
    token,
    sort_field,
    sort_direction

  },
    getTask,
    addTask,
    openModal,
    closeModal,
    openEditTaskModal,
    edit_Task,
    resetToDoState,
    onChangeDropdown,
    sort
  } = props;

  const sort_fieldJSX = sort_fields.map((item, id) => {
    return (
      <Dropdown.Item 
        key={id} 
        onClick={() => onChangeDropdown('sort_field', item.value)} 
      >
          {item.value}
      </Dropdown.Item>
    )
  })
  const sort_directionJSX = sort_directions.map((item, id) => {
    return (
      <Dropdown.Item 
        key={id} 
        onClick={() => onChangeDropdown('sort_direction', item.value)}
      >
          {item.value}
      </Dropdown.Item>
    )
  })

  const handleEditTask = (data, id) => {
    edit_Task(data, id);
  }

  useEffect(() => {
    getTask();
    return () => {
      resetToDoState();
    }
  }, []);

  const tasksJSX = tasks.map(task => {
      return (
        <Col key={task.id}>
            <Task 
            task={task}
            handleOpenEditTaskModal= {openEditTaskModal}
            token={token}
              />
        </Col>
      )
  })  

  return ( 
    <div className={style.mainDiv}>
        <Row className={style.buttonsRow}>
          <Button className={style.add} onClick={() => openModal()} >
              Add Task
          </Button>
          <DropdownButton className={style.sort} variant='info' title={sort_field || 'Sort field'}>
            {sort_fieldJSX}
          </DropdownButton>
          <DropdownButton className={style.sort} variant='info' title={sort_direction || 'Sort direction'}>
            {sort_directionJSX}
          </DropdownButton>
          <Button className={style.sort} onClick={() => sort(sort_direction, sort_field)}>
            Sort
          </Button>
        </Row>
        <Row className={style.tasksRow}>
          <Paginations />
            {tasks.length !== 0 ? tasksJSX : "There are not tasks"}
          <Paginations />
        </Row>
        {loading && <Spiner />}
        {isModalAddTask || <ModalAddTaskWithRedux 
            handleCloseModal= {closeModal}
            getValueAddTask= {addTask} 
        />} 
        {isModalEditTask || <ModalEditTask 
            editableTask= {editTask}
            handleEditTask= {handleEditTask}
            handleCloseModal= {closeModal}
        />} 
    </div>
)
}

const mapStateToProps = (state) => {
  return {
      state: {...state.toDoState, ...state.globalState, ...state.loginState}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: () => { 
      dispatch((dispatch) => useEffectTrunk(dispatch));
    },
    addTask: (task) => {
       dispatch((dispatch) => addTaskThunk(dispatch, task));
    },
    edit_Task: (data, id) => {
      dispatch((dispatch) => handleEditTaskThunk(dispatch, data, id));
    }, 
    onChangeDropdown: (key, value) => {
      dispatch({type: types.SORT_DROPDOWN, key, value})
    },
    sort: (sort_direction, sort_field) => {
      dispatch((dispatch) => sortThunk(dispatch, sort_direction, sort_field));
    },
    openModal: () => dispatch({type: types.OPEN_ADD_MODAL}),
    closeModal: (name) => dispatch({type: types.CLOSE_MODAL, name}),
    openEditTaskModal: (editTask) => dispatch({type: types.OPEN_EDIT_TASK_MODAL, editTask}),
    resetToDoState: () => dispatch({type: types.RESET_TODO_STATE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
