const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");

// GraphQL ID
const { ruruHTML } = require("ruru/server");

// To handle GraphQL queries, we need a schema that defines the Query type, and we need an API root with a function called a “resolver” for each API endpoint.
// E-commerce API example
// (!=required)
const schema = buildSchema(`
    type Query {
      products: [Product]
      orders: [Order]
    }

    type Product {
      id: ID!
      description: String!
      price: Float!
      reviews: [Review]
    }

    type Review {
      rating: Int!
      comment: String
    }

    type Order {
      date: String!
      subtotal: Float!
      items: [OrderItem]
    }

    type OrderItem {
      product: Product!
      quantity: Int!
    }
  `);

const root = {
  products: [
    {
      id: "redshoe",
      description: "A Red Shoe",
      price: 20.99,
      review: [
        {
          rating: 6,
          comment: "A Nice Shoe",
        },
      ],
    },
    {
      id: "bluetshirt",
      description: "A Blue T-shirt",
      price: 10.99,
      // review: [
      //   {
      //     rating: 3,
      //     comment: "A Nice T-shirt",
      //   },
      // ],
    },
  ],
  orders: [
    {
      date: "2005-05-06",
      subtotal: "80.76",
      items: [
        {
          product: {
            id: "redshoe",
            description: "Old Red Shoe",
            price: 5.99,
          },
          quantity: 3, // Amount of Shoes
        },
      ],
    },
  ],
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
