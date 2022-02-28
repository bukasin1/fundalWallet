const joi = require('joi')

exports.userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: joi.string().required()
})

exports.loginSchema = joi.object({
    email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: joi.string().required()
})

exports.cardSchema = joi.object({
    name: joi.string().required()
})