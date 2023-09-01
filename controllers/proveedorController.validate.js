const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const methods = {
  leerProveedor: validator.query(Joi.object({})),

  obtenerUnProveedor: validator.params({
    id: Joi.string().uuid().required(),
  }),

  agregarProveedor: validator.body(
    Joi.object({
      name: Joi.string().required(),
      last_name: Joi.string().required(),
      company_name: Joi.string().required(),
    })
  ),
  modificarProveedor: validator.body(
    Joi.object({
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      last_name: Joi.string().required(),
      company_name: Joi.string().required(),
    })
  ),
  eliminarProveedor: validator.body(
    Joi.object({
      id: Joi.string().uuid().required(),
    })
  ),
};

module.exports = methods;
