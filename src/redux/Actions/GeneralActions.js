import ActionTypes from './ActionTypes';

const getAllUsers = (payload) => {
  return {
    type: ActionTypes.GET_USERS,
    payload
  };
};



export { getAllUsers};
