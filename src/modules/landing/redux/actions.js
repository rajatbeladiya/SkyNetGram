import * as actionTypes from './actionTypes';

export const getMySkyData = (data) => ({
  type: actionTypes.GET_MY_SKY,
  payload: data,
});

export const setUserId = (userId) => ({
  type: actionTypes.SET_USERID,
  payload: userId,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: actionTypes.IS_LOGGEDIN,
  payload: isLoggedIn,
});

export const setFeedData = data => ({
  type: actionTypes.SET_FEED_DATA,
  payload: data,
});

export const setLikesData = data => ({
  type: actionTypes.SET_LIKES_DATA,
  payload: data,
});

export const setLoading = data => ({
  type: actionTypes.SET_LOADING,
  payload: data,
});
