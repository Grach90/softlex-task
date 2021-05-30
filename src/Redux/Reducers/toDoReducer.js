import types from './../actionTypes';

const initialState = {
    tasks: [],
    isModalAddTask: true,
    isModalEditTask: true,
    editTask: null,
    total_task_count: '',
    sort_field: '',
    sort_direction: ''
}

const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_EDIT_TASK_MODAL:
            {
                return {
                    ...state,
                    editTask: action.editTask,
                    isModalEditTask: false
                }
            }
        case types.CLOSE_MODAL:
            {
                return {
                    ...state,
                    [action.name]: true,
                    editTask: null
                }
            }
        case types.OPEN_ADD_MODAL:
            {
                return {
                    ...state,
                    isModalAddTask: !state.isModalAddTask
                }
            }
        case types.ADD_TASK:
            {
                const { tasks } = state;
                tasks.push(action.data);
                return {
                    ...state,
                    isModalAddTask: !state.isModalAddTask,
                    tasks
                }
            }
        case types.GET_TASK:
            {
                return {
                    ...state,
                    tasks: action.data.message.tasks,
                    total_task_count: action.data.message.total_task_count
                }
            }
        case types.RESET_TODO_STATE:
            {
                return {
                    ...initialState
                }
            }
        case types.SORT_DROPDOWN:
            {
                const { key, value } = action;
                return {
                    ...state,
                    [key]: value
                }
            }
        default:
            return state;
    }
}

export default toDoReducer;