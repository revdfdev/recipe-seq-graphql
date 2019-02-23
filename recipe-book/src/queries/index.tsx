import { gql } from 'apollo-boost';


//MUTATION
export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export const SIGN_IN_USER = gql`
  mutation($username: String!, $password:String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`

// QUERY
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username,
      joinDate,
      email
    }
  }
`