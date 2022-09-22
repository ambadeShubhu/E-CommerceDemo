import {authConst} from '../../constant';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = auth => {
  console.log('----', auth);
  try {
    return async dispatch => {
      const body = {
        username: auth.email,
        password: auth.password,
      };
      console.log(auth.email === authConst.email);

      const result = await fetch(`https://fakestoreapi.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(body),
      });
      let json = await result.json();

      // console.log('auth----->', json);
      if (auth.email == 'johnd' && auth.password == 'm38rmF$') {
        console.log('logged In------');
        dispatch({
          type: LOGIN_SUCCESS,
          payload: json.token,
        });
      } else {
        console.log('else--Login Failed');
        dispatch({
          type: LOGIN_FAILED,
          payload: 'Login Failed',
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
