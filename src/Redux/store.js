import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import toDoReducer from './Reducers/toDoReducer';
import globalReducer from './Reducers/globalReducer';
import loginReducer from './Reducers/loginReducer';
import ModalEditTaskReducer from './Reducers/modalEditTaskReducer';

const reducer = combineReducers({
    toDoState: toDoReducer,
    globalState: globalReducer,
    loginState: loginReducer,
    editTaskState: ModalEditTaskReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
export default store;