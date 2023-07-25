const typeDefs = `
  type WebPage {
    id: ID!
    url: String!
    title: String!
    date: String!
    countWords: Number!
  }

  type Query {
    getWebPage(id: ID!): WebPage
    getWebPageByField(field: String!, value: String!): WebPage
  }

  input WebPageInput {
    url: String!
    title: String!
    date: String!
    countWords: Number!
  }

  type Mutation {
    createWebPage(input: WebPageInput!): WebPage
    updateWebPage(id: ID!, input: WebPageInput!): WebPage
    deleteWebPage(id: ID!): ID
  }
`;

export default typeDefs;
