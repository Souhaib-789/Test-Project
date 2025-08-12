import { combineReducers } from 'redux';
import GeneralReducer from './GeneralReducer';

const AppReducers = combineReducers({
  GeneralReducer,
});

const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};

export default Reducer;
