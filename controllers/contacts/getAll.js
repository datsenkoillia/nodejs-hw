import Contact from "../../models/contact.js";

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-__v", {
      skip,
      limit,
    }).populate("owner", "-_id email subscription");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAll;
