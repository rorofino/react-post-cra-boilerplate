import api from '../api/';
import {handleFormSubmitError} from '../utils/validators';

const action_login_succeeded = 'LOGIN_SUCCEEDED';
const action_signup_succeeded = 'LOGIN_SIGNUP_SUCCEEDED';
const action_login_signout = 'LOGIN_SIGNOUT';

export const requestLogin = (loginInfo) => (dispatch, getState) => {
    return api.User.Login(loginInfo).then((data) => dispatch({
        type: action_login_succeeded,
        payload: data
    }), handleFormSubmitError);
};

export const requestSignUp = (user) => (dispatch, getState) => {
    
    api.User.Register(user).then((data) => dispatch({
        type: action_signup_succeeded,
        payload: data
    }), handleFormSubmitError);
};

export const requestSignOut = () => (dispatch, getState) => dispatch({ type: action_login_signout });

const initialState = {
    loggedUser: undefined
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case action_login_succeeded:
            return { ...state, loggedUser: action.payload };
        case action_signup_succeeded:
            return { ...state, loggedUser: action.payload };
        case action_login_signout:
            return { ...state, loggedUser: initialState.loggedUser };
        default:
            return state;
    }
};

export default auth;