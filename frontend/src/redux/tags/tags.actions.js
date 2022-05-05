import {GET_TAG, GET_TAGS, TAG_ERROR} from './tags.types';
import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import config from "../../config";

export const getTag = (tagName) => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + `/api/tags/${tagName}`);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    // dispatch(() => history.push('/questions'))
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    console.log("Asa"+config.BASE_URL);
    const res = await axios.get(config.BASE_URL + '/tag/get-tags');
    console.log(res);
    dispatch({
      type: GET_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
