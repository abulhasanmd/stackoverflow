import {
  GET_COMMENTS,
  COMMENT_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_ANSWER_COMMENTS
} from './comments.types';

const initialState = {
  comments: [],
  answerComments: [],
  loading: true,
  error: {},
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case GET_ANSWER_COMMENTS:
      return {
        ...state,
        answerComments: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (answer) => answer.id !== action.payload
        ),
        loading: false,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
