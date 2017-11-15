import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [ thunk ];

const store = createStore(
    reducer,
    //uncomment and add initial state to rehydrate
    applyMiddleware(...middleware)
);

export default store;