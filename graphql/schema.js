const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    input InputUserData {
        name: String!
        email: String!
        password: String!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        role: String!
        status: String!
    }
    type RootQuery {
        hello: String
    }
    type RootMutation {
        createUser(userInput: InputUserData): User!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);