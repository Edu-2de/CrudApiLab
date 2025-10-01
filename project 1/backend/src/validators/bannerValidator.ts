import Joi from 'joi';
export const bannerSchema = Joi.object({
  title: Joi.string().required(),
  image_url: Joi.string().required(),
  link_url: Joi.string().required(),
});
