const { AuthenticationError } = require('apollo-server-core');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const getTokenPayload = () => {
    return jwt.verify(token, SECRET_KEY)
}

const getUserId = (req, authToken) => {
    if(req){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error(`No token found`);
            }
            const {userId} = getTokenPayload(token);
            return userId;
        }
    } else if(authToken) {
        const {userId} = getTokenPayload(authToken);
        return userId;
    }

    throw new AuthenticationError(`you are not authenticated`)
}

module.exports = {
    getUserId
}