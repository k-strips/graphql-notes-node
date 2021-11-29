const Query = require('./Query')
const Mutation = require('./Mutation')
const User = require('./User')
const {dateScalar, emailScalar, phoneScalar} = require('./Scalar')


module.exports = {
    Date: dateScalar,
    Email: emailScalar,
    Phone: phoneScalar,
    User,
    Query,
    Mutation
}