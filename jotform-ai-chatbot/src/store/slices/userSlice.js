import { generatePromiseActionType } from '../actionTypes';

// Internal action types (only used within this slice)
const SET_USER = 'SET_USER';
const FETCH_USER = generatePromiseActionType('FETCH_USER');

// Shared action types (exported for use by other slices)
export { FETCH_USER };

// Initial state for user domain
export const userInitialState = {
  user: null,
  refetchUser: false
};

// User slice reducer
export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };

    case FETCH_USER.REQUEST:
      return state;

    case FETCH_USER.SUCCESS:
      const user = action.payload.result;
      return { ...state, user };

    case FETCH_USER.ERROR:
      // Handle EU redirection and error states
      let errorState = {};
      const errorData = action.payload.result?.data;
      if (errorData?.responseCode === 301 && errorData.location?.includes('eu-api')) {
        errorState = { refetchUser: true };
      }
      return { ...state, ...errorState };

    default:
      return state;
  }
};

// User action creators
export const userActionCreators = {
  setUser: user => ({
    type: SET_USER,
    payload: { user }
  }),

  fetchUserRequest: () => ({
    type: FETCH_USER.REQUEST
  }),

  fetchUserSuccess: result => ({
    type: FETCH_USER.SUCCESS,
    payload: { result }
  }),

  fetchUserError: result => ({
    type: FETCH_USER.ERROR,
    payload: { result }
  })
};
