import { USER, LOGOUT, SIGNUP } from '../Types';
const intialState = {
    user: {},
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case USER: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case SIGNUP: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {},
                isLogin: false
            }
        }
        default:
            return state

    }
}
export default reducer;