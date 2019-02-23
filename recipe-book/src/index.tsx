import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },

  request: async (operation: any) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },

  onError: ({ networkError }) => {
    if (networkError) console.log("Network Error", networkError);
  }
});

const Root = ({ refetch, session }) => { 
  <Router>
    <>
        
    </>
  </Router>
}


ReactDOM.render(<App />, document.getElementById('root'));
