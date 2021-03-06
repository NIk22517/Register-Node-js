const Joi = require('@hapi/joi');


const registerValidation = (data) => {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.number(),
        address: Joi.string()
    }
    return Joi.validate(data, schema);
}


const loginValidation = (data) => {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

