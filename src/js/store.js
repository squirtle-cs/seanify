import { createStore } from 'redux';
import rootReducer from './reducers/mainReducer';

const store = createStore(rootReducer);
store.subscribe(() => console.log('Redux is real!!'));

export default store;
