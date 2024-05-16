const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query {
      products: [Product]   
      orders: [Order]       
    }

    type Product {
      id: ID!
      description: String!
      reviews: [Review]
      price: Float!
    }

    type Review {
      rating: Int
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
      id: "Protein Bar",
      description: "Protein Bar Description",
      price: 4,
    },
    {
      id: "Jean,",
      description: "Blue Jean",
      price: 50,
    },
  ],

  orders: [
    {
      date: "2024-05-25",
      subtotal: 40,
      items: [
        {
          product: {
            id: "Protein Bar",
            description: "Big Protein Bar",
            price: 5,
            reviews: [
              {
                rating: 5,
                comment: "delicious bar",
              },
            ],
          },
          quantity: 10,
        },
      ],
    },
  ],
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
