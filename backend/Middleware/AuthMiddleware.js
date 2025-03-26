const  JWT = require('jsonwebtoken');
const ensureAuthenticted = (req, res, next) => {
    const Auth = req.headers['authorization'];
    if(!Auth){
        return res.status(401).json({message: 'Unauthorized JWT Token', success: false});
    }

    try {
       const decoded = JWT.verify(Auth, process.env.JWT_SECRET);
         req.user = decoded;
         next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized JWT Token', success: false});
    }
}

module.exports = ensureAuthenticted;