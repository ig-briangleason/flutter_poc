import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "@Server/graphql/resolvers";
import { schema } from "@Server/graphql/schema";

export type Context = {
};

export const apolloServer = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  playground: true,
  context: ({ req }: any) => ({
  }),
});
