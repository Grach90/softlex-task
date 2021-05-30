import types from '../actionTypes';

const initialState = {
    username: '',
    email: '',
    text: '',
    status: ''
}

const ModalEditTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_CHANGE_MODAL:
            {
                const { name, value } = action.e.target;
                return {
                    ...state,
                    [name]: value
                }
            }
        case types.ONCHANGE_DROPDOWN:
            {
                return {
                    ...state,
                    status: action.data
                }
            }
        default:
            return state;
    }

}

export default ModalEditTaskReducer;