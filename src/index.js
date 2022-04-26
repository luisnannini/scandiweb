import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './reset.css';
import './index.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
