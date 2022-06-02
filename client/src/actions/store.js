import api from '../utils/api'
import store from '../store'
import { setAlert } from './alert'
import {
    DIAMONDS_ERROR,
} from './types';

const {dispatch} = store;

//////////// Admin Manage Diamonds ////////////
export const addDiamonds = async (values) => {
    try {
        const res = await api.post('/store/addDiamonds', values)
        console.log(res.data)
        dispatch(setAlert("Record Added Sucessfully !", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
    }
}

// GET Diamonds
export const getDiamonds = async (id) => {
    try {
        const res = await api.get('/store/getDiamonds')

        dispatch({
            type: "UPDATE_DIMONDS",
            payload: res.data
        });

        dispatch(setAlert('Diamonds Deleted Successfully !', 'success'));
    }
    catch (err) {
        dispatch({
          type: DIAMONDS_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
}



// Delete Diamonds
export const deletDiamonds = async (id) => {
    try {
        const res = await api.delete(`/store/delteDiamonds/${id}`)

        dispatch({
            type: "UPDATE_DIMONDS",
            payload: res.data
        });

        dispatch(setAlert('Diamonds Deleted Successfully !', 'success'));
    }
    catch (err) {
        dispatch({
          type: DIAMONDS_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
}



//////////// Admin Manage Hastags////////////
export const addHashtags = async (values) => {
    try {
        await api.post('/store/addHashTags', values)
        dispatch(setAlert("Record Added Sucessfully !", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
    }
}


//////////// Admin add Links////////////
export const addShareableLinks = async (links) => {
    try {
        await api.post('/store/links', links)
        dispatch(setAlert("Record Added Sucessfully !", 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
        }
    }
}




