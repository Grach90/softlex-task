const initialState = {
    token: !!localStorage.getItem('token')
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            {
                return {
                    token: true
                }
            }
        case 'LOG_OUT':
            {
                localStorage.removeItem('token');
                return {
                    token: false
                }
            }
        default:
            {
                return state;
            }
    }
}

export default loginReducer;