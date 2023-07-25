const typeDefs = `
  type WebPage {
    url: String!
    title: String!
    date: String!
    countWords: Int!
  }

  type Query {
    getWebPage(url: String!): WebPage
    getWebPageByField(field: String!, value: String!): WebPage
  }

  input WebPageInput {
    url: String!
    title: String!
    date: String!
    countWords: Int!
  }

  type Mutation {
    createWebPage(input: WebPageInput!): WebPage
    updateWebPage(url: String!, input: WebPageInput!): WebPage
    deleteWebPage(url: String!): Boolean
  }
`;

export default typeDefs;
