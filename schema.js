const typedefs = `
  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String
  }

  type Query {
    getCurrentUser: User
  }

  type Token {
    token: String!
  }

  type Mutation {
    signInUser(username: String!, password: String!): Token
    signUpUser(username: String!, email: String!, password: String!): Token
  }
`
export default typedefs;