const Joi = require("joi");

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.number().min(8).required(),
    birth: Joi.required(),
    login: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(5).required(),
    gender: Joi.string().required(),
    online: Joi.boolean()
});

module.exports = schema;
