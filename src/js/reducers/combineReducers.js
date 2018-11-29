import { combineReducers } from 'redux';
import leftContainerReducer from './leftContainerReducer';
import rightContainerReducer from './rightContainerReducer';

const reducers = combineReducers({
  leftContainerReducer,
  rightContainerReducer,
});

export default reducers;
