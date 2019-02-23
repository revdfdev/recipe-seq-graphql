import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typedefs from './schema';
import resolver from './resolver';
import db from './models'
import cors from 'cors';
import { verify } from 'jsonwebtoken';
import { config } from "dotenv";

config({ path: '.env' });

const server = new ApolloServer({
  typeDefs: gql(typedefs),
  resolvers: resolver,
  context: { db }
});

const app = express();

server.applyMiddleware({ app });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== null) {
    try {
      const currentUser = await verify(token, process.env.SECRET);
      req.currentUser = currentUser;
      console.log("current user on fetch", req.currentUser);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});


app.use(express.static("app/public"))

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})