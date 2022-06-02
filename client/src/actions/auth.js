import api from '../utils/api'
import store from '../store'
import { setAlert } from './alert'
import {
    GET_USERS,
    USERS_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';

const {dispatch} = store;


//////////// Login Admin ////////////
export const login = (email, password) => async dispatch => {

    const body = { email, password };
  
    try {
      const res = await api.post('/auth/login', body);
  
      const token = {
        token: res.data.sendData.token
      };
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });
  
      dispatch(loadUser());
  
    }
    catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

// Load Admin
export const loadUser = () => async dispatch => {

    try {
      const res = await api.get('/auth/getAdmin');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
    catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };



//////////// USER Tab ////////////
export const getUsers = async () => {
    try {
        const res = await api.get('/auth/users')
        console.log(res.data)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}