const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString
} = graphql
const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { username, password }, req) {
        return AuthService.login({ username, password, req })
      }
    }
  }
})

module.exports = mutation
