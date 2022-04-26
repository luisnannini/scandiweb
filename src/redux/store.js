import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducers/rootReducers';

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools());
};

export const store = configureStore();
