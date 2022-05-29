import * as actionTypes from "./actionTypes";
import {searchNews} from "../utils";

export function fetchNews(mounted) {
  return function fetchNewsThunk(dispatch) {
    dispatch({type: actionTypes.FETCH_NEWS});

    if (!mounted) {
      return;
    } else {
      searchNews()
        .then((response) => {
          dispatch({type: actionTypes.FETCH_NEWS_SUCCESS, payload: response});
        })
        .catch((error) => {
          dispatch({type: actionTypes.FETCH_NEWS_FAILED});
          console.error(error);
        });
    }
  };
}

export const fetchNewsSuccess = (content) => ({
  type: actionTypes.FETCH_NEWS_SUCCESS,
  payload: content,
});

export const fetchNewsFailed = () => ({
  type: actionTypes.FETCH_NEWS_FAILED,
});

export const loadingBegin = (content) => ({
  type: actionTypes.LOADING_BEGIN,
  payload: content,
});

export const loadingComplete = () => ({
  type: actionTypes.LOADING_COMPLETE,
});
