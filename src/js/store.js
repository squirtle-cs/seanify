import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/combineReducers';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

// store.subscribe(() => console.log('Redux is real!!'));

export default store;
