const Joi = require('joi');

let clientSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
});

let deliveryAgentSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
  phone: Joi.string().required().trim(),
  role: Joi.string().equal('delivery_agent').required(),
  city: Joi.string().required(),
  vehiculeType: Joi.string().required(),
});

exports.validateUserDataMiddelware = (req, res, next) => {
  const { error } = req.body.role ? deliveryAgentSchema.validate(req.body) : clientSchema.validate(req.body);
  if (error) console.log(error);
  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message,
    });

  next();
};
