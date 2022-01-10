const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Query {
        products: [Product]
        product(_id: ID): Product
    },
    type Product {
        _id: ID
        title: String
        price: Int
        thumbnail: String
        timestamp: String
        description: String
        code: String
        stock: Int
    },
    type Mutation {
        createProduct(
            title: String,
            price: Int,
            thumbnail: String,
            timestamp: String,
            description: String,
            code: String,
            stock: Int
        ): Product
    }
`);
