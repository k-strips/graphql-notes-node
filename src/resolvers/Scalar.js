const { UserInputError } = require('apollo-server-core');
const { GraphQLScalarType, Kind } = require('graphql');
const {isValidPhoneNumber} = require('libphonenumber-js');

const validateEmail = (email) => {
  const emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(emailRgx)) {
    return email
  }
  throw new UserInputError(`please provide a valid email address`)
}

const validatePhone = (number) => {
  if (isValidPhoneNumber(number)) {
    return number
  }
  throw new UserInputError(`please provide a valid phone number`)
}

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value; // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return value; // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return value; // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  });

  const phoneScalar = new GraphQLScalarType({
    name: 'Phone',
    description: 'Phone custom scalar type',
    serialize: validatePhone,
    parseValue: validatePhone,
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return validatePhone(parseString(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  });


  const emailScalar = new GraphQLScalarType({
    name: 'Email',
    description: 'Email custom scalar type',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return validateEmail(parseString(ast.value, 10)); // Convert hard-coded AST string to string and then validate Email
      }
      return null; // Invalid hard-coded value (not an email)
    },
  });

  module.exports = {
      dateScalar,
      phoneScalar,
      emailScalar
  }