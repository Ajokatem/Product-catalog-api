const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(403).json({ message: 'Invalid Token' });
        }
    },
    
    authorize: (roles = []) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
            }
            next();
        };
    }
};
