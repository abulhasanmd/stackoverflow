import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./auth.types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        // ...action.payload,
        loading: false,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        user: action.payload.data,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token")
      console.log("logout dispatch")
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        data: null,
        msg: "",
        ...state,
      }
    default:
      return state
  }
}
