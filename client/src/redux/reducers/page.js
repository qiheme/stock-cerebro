import {LOADING_BEGIN, LOADING_COMPLETE} from "../actionTypes";

const initialState = {
  status: {
    loading: true,
    error: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_BEGIN:
      return {...state, status: {loading: true}};
    case LOADING_COMPLETE:
      return {...state, status: {loading: false}};
    default:
      return state;
  }
}
