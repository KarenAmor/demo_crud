const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const methods = {
  leerProducto: validator.query(
    Joi.object({})
  ),
  obtenerCompanyName: validator.params(
    Joi.object({})
  ),
  obtenerProducto: validator.params(
    Joi.object({})
  ),
  agregarProducto: validator.body(
    Joi.object({
      company_name: Joi.string().required(),
      product: Joi.string().required(),
      cost: Joi.number().integer().min(0).required()
    })
  ),
  modificarProducto: validator.body(
    Joi.object({
      id: Joi.string().uuid().required(),
      company_name: Joi.string(),
      product: Joi.string(),
      cost: Joi.number().integer().min(0)
    })
  ),
  eliminarProducto: validator.body(
    Joi.object({
      id: Joi.string().uuid().required(),
    })
  ),
};

module.exports = methods;