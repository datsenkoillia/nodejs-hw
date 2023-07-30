import Contact from "../../models/contact.js";
import { HttpError } from "../../helpers/index.js";
import { contactsAddSchema } from "../../schemas/contacts-schemas.js";

const addNew = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default addNew;
