const Joi = require("joi");

const creatUserSchema = Joi.object().keys({
    nama: Joi.string().min(3).max(10).required(),
    no_rek: Joi.string().min(3).max(15).required(),
    no_hp: Joi.string().min(3).max(15).required(),
  });

module.exports = creatUserSchema