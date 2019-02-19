const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }

  input UserInput {
    email: String!
    name: String!
    password: String!
  }

  input PostInput {
    title: String!
    content: String!
    imageUrl: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts(page: Int): PostData!
    post(id: ID!): Post!
    user: User!
  }

  type RootMutation {
    createUser(userInput: UserInput): User!
    createPost(postInput: PostInput): Post!
    updatePost(id: ID!, postInput: PostInput): Post!
    deletePost(id: ID!): Boolean
    updateStatus(status: String!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
