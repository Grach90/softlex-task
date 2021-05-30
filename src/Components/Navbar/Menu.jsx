import React, {useRef} from "react";
import style from './menu.module.css';
import { Form, InputGroup, Navbar, Button } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";
import {connect} from 'react-redux';
import {loginThunk} from '../../Redux/action';

const Menu = ({login, token, logout}) => {
  
  const form = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    login(data);
  }

  return (
    <Navbar bg="light" variant="light" className={style.navbar} >
      <Navbar.Brand className={style.brand} href="/">
        <Logo
          className={style.Applogo}
          alt=""
          width="50"
          height="50"
        />
        React Project
      </Navbar.Brand>
      <Form className={style.form} ref={form}>
        <InputGroup className={style.inputGroup}>
          {!!token || <Form.Control 
            type='text'
            name='username'
            className='mr-3' 
            placeholder='UserName'
          />}
          {!!token || <Form.Control 
            type='password'
            name='password'
            className='mr-3' 
            placeholder='Password'
          />}
          {(!token) 
          ? <Button className={style.input} type='submit' onClick={submit}>
            Login
            </Button>
          :<Button className={style.input} onClick={logout}>
            Logout
          </Button>}
        </InputGroup>
        </Form>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
    return {
      ...state.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (data) => {
        dispatch((dispatch) => loginThunk(dispatch, data));
      },
      logout: () => {
        dispatch({type: 'LOG_OUT'})
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu); 
