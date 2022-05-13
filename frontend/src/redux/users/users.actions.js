import axios from "axios"

import config from "../../config"
import { GET_USERS, GET_USER, USER_ERROR, LOADING_USER } from "./users.types"

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER })
    const res = await axios.get(config.BASE_URL + "/users/get-all-users")
    console.log(res)
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get user
export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER })
    const res = await axios.get(config.BASE_URL + `/users/profile/${id}`)
    dispatch({
      type: GET_USER,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
