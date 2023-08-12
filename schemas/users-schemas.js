import Joi from "joi";

export const userJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      allowFullyQualified: true,
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
    }),
  password: Joi.string().min(6).required(),
});

export const userEmailJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      allowFullyQualified: true,
    })
    .required()
    .messages({
      "any.required": `missing required field email`,
    }),
});
