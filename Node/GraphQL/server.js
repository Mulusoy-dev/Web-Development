const path = require("path");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

// GraphQL ID
const { ruruHTML } = require("ruru/server");

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: {
    Query: {
      products: async (parent, args, context, info) => {
        console.log("Getting the products...");
        const product = await Promise.resolve(parent.products);
        return product;
      },
      orders: async (parent, args, context, info) => {
        console.log("Getting the orders...");
        const order = await Promise.resolve(parent.orders);
        return order;
      },
    },
  },
});

const root = {
  products: require("./products/products.model"),
  orders: require("./orders/orders.model"),
};

const app = express();

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Create and use the GraphQL handler
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
