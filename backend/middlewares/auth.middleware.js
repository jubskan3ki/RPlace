const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }

    console.log(`Auth header: ${authHeader}`);

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log(`Decoded token: ${JSON.stringify(decoded)}`);

        req.user = {
            id: decoded.userId,
            username: decoded.username,
        };

        console.log(`Req.user after assignation: ${JSON.stringify(req.user)}`);

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};



module.exports = authMiddleware;
