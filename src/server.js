const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require('graphql-upload');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { PrismaClient } = require("@prisma/client");
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// local imports
const resolvers = require('./resolvers');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({req, res}) => {
      return {
        ...req,
        prisma,
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer()
