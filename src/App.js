import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Components/Home/Home";
import Menu from "./Components/Navbar/Menu.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";



const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: "/error/:status",
        component: NotFound,
        exact: true
    }
]


const App = (props) => {
    const {errorMessage, successMessage} = props;
    useEffect(()=> {
        errorMessage &&  toast.error(errorMessage, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        successMessage && toast.success(successMessage, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }, [errorMessage, successMessage]);
    
        const routerJSX = routes.map((item, index) => {
            return (
                <Route 
                    key={index} 
                    path={item.path} 
                    component={item.component} 
                    exact={item.exact} 
                />
            )
        })
        return(
            <div className="App">
                <Menu />
                <Switch>
                    {routerJSX}
                    <Redirect to="/error/404" />
                </Switch>
                <ToastContainer />
            </div>
        )
    
}  
const mapStateToProps = (state) => ({
    errorMessage: state.globalState.errorMessage,
    successMessage: state.globalState.successMessage
})

export default connect(mapStateToProps, null)(App);