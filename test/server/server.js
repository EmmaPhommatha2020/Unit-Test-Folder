const { GraphQLServer } = require('graphql-yoga')

// ! :mean not null
// link :give back the type link
// Mutation :change data from post, that can update and delete at the same time
// only 2 public that you can access are Query, and Mutation

const typeDefs = `
type Query {
  info: String! 
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`

// variable link
// The links variable is used to store the links at runtime. For now, everything is stored only in-memory rather than being persisted in a database.

let links = [{ 
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// You’re adding a new resolver for the feed root field. Notice that a resolver always has to be named after the corresponding field from the schema definition.

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links, // return variable link// ex: app.get('db).getStories(),
    },
    Mutation: {
        post: (root, args) => {
           const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link)
          return link
        }
    },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))