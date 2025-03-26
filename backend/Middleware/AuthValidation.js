const joi = require('joi');
const signupvalidation = (req, res, next) => {
    const shema = joi.object({
        name: joi.string().min(3).max(100).required(),
        phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    const { error } = shema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request" + error });
    }
    next();
}


const loginvalidation = (req, res, next) => {
    const shema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    const { error } = shema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request "+error });
    }
    next();
}

module.exports = {
    signupvalidation,
    loginvalidation
}