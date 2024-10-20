import { USER } from '../Types';
export const Users = payload => {
    return {
        type: USER,
        payload: payload
    }
};
