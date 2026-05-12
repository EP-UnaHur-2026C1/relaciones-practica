const Joi = require('joi')

const schema  = Joi.object({
    nombre: Joi.string().required().min(5).max(10).messages({
        "any.required" :"nombre es requerido",
        "string.min" : "nombre debe tener como mínimo {#limit} caracteres",
        "string.max" : "nombre debe tener como máximo {#limit} caracteres"
    }),
    fechaNacimiento: Joi.string().required().min(10).max(10).messages({
        "any.required" :"fechaNacimiento es requerido",
        "string.min" : "fechaNacimiento debe tener como mínimo {#limit} caracteres",
        "string.max" : "fechaNacimiento debe tener como máximo {#limit} caracteres"
    })
})

module.exports = schema