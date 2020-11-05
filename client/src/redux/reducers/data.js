import {FETCH_NEWS_FAILED, FETCH_NEWS_SUCCESS} from "../actionTypes";

const initialState = {
  news: {
    status: false,
    response: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        news: {
          status: true,
          response: action.payload.data,
        },
      };
    case FETCH_NEWS_FAILED:
      return {
        ...state,
        news: {
          status: false,
          response: [],
        },
      };
    default:
      return state;
  }
}
