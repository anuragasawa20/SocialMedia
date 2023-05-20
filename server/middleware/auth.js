//const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {

    try {

        let token = req.header("Authorization");

        if (!token) {
            return req.status(403).send("access denied");
        }

        if (token.startWith("Bearer ")) {
            token = token.slice(7, tokens.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.jwt_secretKey);
        req.user = verified;
        next();
    }
    catch (err) {
        req.status(500).json({ error: err.message });
    }
}


//module.exports = verifyToken;