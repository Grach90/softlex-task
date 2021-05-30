import types from './actionTypes';
const API_HOST = 'https://uxcandy.com/~shapoval/test-task-backend/';
const developer = 'developer=Hrachya';

export const handleEditTaskThunk = (dispatch, data, id) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}v2/edit/${id}/?${developer}`, {
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .then(task => {
            if (task.message) {
                dispatch({ type: 'LOG_OUT' });
            }
            useEffectTrunk(dispatch);
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const addTaskThunk = async(dispatch, task) => {
    dispatch({ type: types.SET_LOADING });
    try {
        let response = await fetch(`${API_HOST}v2/create?${developer}`, {
            crossDomain: true,
            method: 'POST',
            body: task
        })
        let data = await response.json();
        if (data.error) throw data.error;
        dispatch({ type: types.ADD_TASK, data });
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been added success!' });
    } catch (error) {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
    } finally {
        dispatch({ type: types.SET_LOADING });
    }
};

export const useEffectTrunk = (dispatch) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}v2/?${developer}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.GET_TASK, data });
            dispatch({ type: types.CLOSE_MODAL, name: "isModalEditTask" });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const loginThunk = (dispatch, data) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}v2/login?developer=Hrach`, {
        method: 'POST',
        body: data
    }).
    then(res => res.json()).
    then(token => {
        if (token.status === 'error') throw token;
        localStorage.setItem('token', token.message.token)
        dispatch({ type: 'LOG_IN' });
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Вход был выполнен успешно!' });
    }).
    catch(error => {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message.password })
    }).
    finally(() => dispatch({ type: types.SET_LOADING }));
}

export const paginateThunk = (dispatch, page) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}?developer=Hrachya&page=${page}`).
    then(res => res.json()).
    then(data => {
        if (data.status === 'error') throw data.status;
        dispatch({ type: types.GET_TASK, data });
    }).
    catch(error => {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message.password })
    }).
    finally(() => dispatch({ type: types.SET_LOADING }));
}
export const sortThunk = (dispatch, sort_direction, sort_field) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}?developer=Hrachya&sort_direction=${sort_direction}&sort_field=${sort_field}`).
    then(res => res.json()).
    then(data => {
        if (data.status === 'error') throw data.status;
        dispatch({ type: types.GET_TASK, data });
    }).
    catch(error => {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message.password })
    }).
    finally(() => dispatch({ type: types.SET_LOADING }));
}