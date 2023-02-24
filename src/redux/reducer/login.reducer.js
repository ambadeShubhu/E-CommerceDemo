import {LOGIN_FAILED, LOGIN_SUCCESS, IS_LOADING} from '../action/login.action';

const initialState = {
  token: null,
  userId: 1,
};

const loginReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      console.log('reducer-----',payload);
      return {...state, token: payload};
    case LOGIN_FAILED:
      return {...state, token: null};
    default:
      return state;
  }
};

export default loginReducer;
