import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from "react-router-dom";


const handleSignOut = (client: any, history: any) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push("/");
};

const SignOut = (history: any) => (
  <ApolloConsumer>
    {(client: any) => {
      return <button onClick={() => { handleSignOut(client, history) }}>Sign out</button>
    }}
  </ApolloConsumer>
)

export default SignOut;