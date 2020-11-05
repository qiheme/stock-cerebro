import * as actionTypes from "./actionTypes";

export const fetchNewsSuccess = (content) => ({
  type: actionTypes.FETCH_NEWS_SUCCESS,
  payload: content,
});

export const fetchNewsFailed = (content) => ({
  type: actionTypes.FETCH_NEWS_FAILED,
  payload: content,
});

export const loadingBegin = (content) => ({
  type: actionTypes.LOADING_BEGIN,
  payload: content,
});

export const loadingComplete = (content) => ({
  type: actionTypes.LOADING_COMPLETE,
  payload: content,
});
