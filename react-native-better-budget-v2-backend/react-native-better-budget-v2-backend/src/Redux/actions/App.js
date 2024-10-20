import { FIRSTLOGIN, BUDGET, ALLBUDGET, BUDGETINDEX } from '../Types';

export const FirstTimeLogin = payload => {
    return {
        type: FIRSTLOGIN,
        payload: payload
    }
}

export const Budget = payload => {
    return {
        type: BUDGET,
        payload: payload
    }
}

export const AllBudget = payload => {
    return {
        type: ALLBUDGET,
        payload: payload
    }
}

export const BudgetIndex = payload => {
    return {
        type: BUDGETINDEX,
        payload: payload,
    };
}
