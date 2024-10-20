import { ALLBUDGET, BUDGET, FIRSTLOGIN } from '../Types';
const intialState = {
    user: {},
    userBudget: {},
    isLogin: false,
    firstlogin: true,
    allBudget: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case FIRSTLOGIN: {
            return {
                ...state,
                firstlogin: action.payload,
            }
        }
        case BUDGET: {
            return {
                ...state,
                userBudget: action.payload,
            }
        }
        case ALLBUDGET: {
            return {
                ...state,
                allBudget: action.payload,
            }
        }
        default:
            return state

    }
}
export default reducer;