import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  usersList: []
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      state = { ...state, usersList: action.payload };
      break;


    default:
      break;
  }
  return state;
};

export default GeneralReducer;
