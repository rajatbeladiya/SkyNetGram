import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  mySkyData: {},
  userId: '',
  isLoggedIn: false,
  feedData: [],
  loading: false,
  likesData: [],
};


export default (state = INITIAL_STATE, action) => { // eslint-disable-line
  switch (action.type) {
    case actionTypes.GET_MY_SKY:
      return {
        ...state,
        mySkyData: action.payload,
      };
    case actionTypes.SET_USERID:
      return {
        ...state,
        userId: action.payload,
      };
    case actionTypes.IS_LOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case actionTypes.SET_FEED_DATA:
      return {
        ...state,
        feedData: action.payload,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_LIKES_DATA:
      return {
        ...state,
        likesData: action.payload,
      };
    default:
      return state;
  }
};
