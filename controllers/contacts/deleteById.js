import Contact from "../../models/contact.js";

import { HttpError } from "../../helpers/index.js";

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export default deleteById;