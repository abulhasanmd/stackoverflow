import {
  GET_ANSWERS,
  ANSWER_ERROR,
  ADD_ANSWER,
  DELETE_ANSWER,
} from "./answers.types"

import axios from "axios"
import { setAlert } from "../alert/alert.actions"
import config from "../../config"

export const getAnswers = (questionId) => async (dispatch) => {
  try {
    console.log("Question id in get answers is", questionId)
    const res = await axios.get(
      config.BASE_URL + `/answer/get-answer-by-questionid/${questionId}`
    )
    console.log("Get Answers res is", res.data.data)
    dispatch({
      type: GET_ANSWERS,
      payload: res.data.data,
    })
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// export const chooseBestAnswer = (answerId) => async (dispatch) => {
//   try {
//     const res = await axios.post(
//       config.BASE_URL + `/answer/choose-best-answer/${answerId}`
//     )
//     console.log("Choose best answer res is", res.data.data)
//     dispatch({
//       type: GET_ANSWERS,
//       payload: res.data.data,
//     })
//   } catch (err) {
//     dispatch({
//       type: ANSWER_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     })
//   }
// }

// Add Answer
export const addAnswer = (formData) => async (dispatch) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const res = await axios.post(
      config.BASE_URL + `/answer/post-answer`,
      formData,
      config_headers
    )

    dispatch({
      type: ADD_ANSWER,
      payload: res.data.data,
    })

    // dispatch(setAlert(res.data.message, 'success'));
    dispatch(setAlert("Answer created successfully!", 'success'));

    dispatch(getAnswers(formData.questionId))
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete Answer
export const deleteAnswer = (AnswerId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      config.BASE_URL + `/api/posts/answers/${AnswerId}`
    )

    dispatch({
      type: DELETE_ANSWER,
      payload: AnswerId,
    })

    dispatch(setAlert(res.data.message, "success"))
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"))

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
