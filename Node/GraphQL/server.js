const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");

// GraphQL ID
const { ruruHTML } = require("ruru/server");

// To handle GraphQL queries, we need a schema that defines the Query type, and we need an API root with a function called a “resolver” for each API endpoint.
// E-commerce API example
const schema = buildSchema(`
    type Query {
    description: String
    price: Float
    }
  `);

const root = {
  description: "T-shirt",
  price: 30.99,
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
