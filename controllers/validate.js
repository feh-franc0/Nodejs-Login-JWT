const Joi = require('@hapi/joi');

const registerValidade = (data) => {

    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schema.validate(data)
}

const loginValidade = (data) => {

    const schema = Joi.object({
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(100),
    })

    return schema.validate(data)
}

module.exports.loginValidade = loginValidade;
module.exports.registerValidade = registerValidade;