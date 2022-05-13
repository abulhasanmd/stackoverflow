import axios from "axios"

import config from "../../config"
// import setAuthToken from "./auth.utils"
import { setAlert } from "../alert/alert.actions"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // USER_LOADED,
  // AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./auth.types"

// Load User
// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token)
//   }
//   try {
//     const res = await axios.get(config.BASE_URL + `/api/auth`)

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data.data,
//     })
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     })
//   }
// }

// Register User
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config_headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }

    const body = JSON.stringify({ username, email, password })

    try {
      const res = await axios.post(
        config.BASE_URL + `/users/signup`,
        body,
        config_headers
      )
      console.log("register action", res.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })

      if (res.data.message) {
        dispatch(setAlert(res.data.message, "success"))
      }

      if (res.data.msg) {
        dispatch(setAlert(res.data.msg, "danger"))
      }

      // dispatch(loadUser())
    } catch (err) {
      dispatch(setAlert(err, "danger"))

      dispatch({
        type: REGISTER_FAIL,
      })
    }
  }

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config_headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }

    const body = JSON.stringify({ email, password })

    try {
      const res = await axios.post(
        config.BASE_URL + `/users/login`,
        body,
        config_headers
      )
      console.log("response from login action", res.data)
      if (res.data.msg === "Invalid user name or password") {
        dispatch({
          type: LOGIN_FAIL,
        })
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      }
      // dispatch(setAlert(res.data.message, "success"))

      // dispatch(loadUser())
    } catch (err) {
      // dispatch(setAlert(err.response.data.message, "danger"))

      dispatch({
        type: LOGIN_FAIL,
      })
    }
  }

//LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("persist:root")
  // dispatch(setAlert("User has logged out", "success"));
  console.log("first logout action")
  dispatch({ type: LOGOUT })
}
