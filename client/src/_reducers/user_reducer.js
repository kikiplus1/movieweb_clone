import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_action/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSucess: action.payload} //loginSucess에 payload(백엔드값을 집어넣어라)

        case REGISTER_USER:
            return {...state, register: action.payload}

        case AUTH_USER:
            return {...state, userData: action.payload}

        default:
            return state;
   
    }
}