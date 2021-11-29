const Query = require('./Query')
const Mutation = require('./Mutation')
const {dateScalar, emailScalar, phoneScalar} = require('./Scalar')


module.exports = {
    Date: dateScalar,
    Email: emailScalar,
    Phone: phoneScalar,
    Query,
    Mutation
}