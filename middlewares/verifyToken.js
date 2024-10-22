const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token Not Found or Valid' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.userid = decoded.userID;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token Not Found ' });
    }
};

module.exports = verifyToken;