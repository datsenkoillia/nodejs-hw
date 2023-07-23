import Contact from "../../models/contact.js";

import { contactsAddSchema } from "../../schemas/contacts-schemas.js";

const addNew = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default addNew;
