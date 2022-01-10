const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/index.shema.graphql");
const resolversRoot = require("../resolvers/index.resolvers.graphql");

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: resolversRoot,
  graphiql: true,
});
