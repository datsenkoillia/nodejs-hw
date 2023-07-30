import User from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";

const subscriptionUpdate = async (req, res, next) => {
  try {
    const { email, _id } = req.user;
    console.log(_id);
    const { subscription } = req.body;

    let newSubscription;
    switch (subscription) {
      case "starter":
        newSubscription = "starter";
        break;
      case "pro":
        newSubscription = "pro";
        break;
      case "business":
        newSubscription = "business";
        break;
      default:
        throw HttpError(404, `${subscription}: such type of subscription not found`);
    }

    await User.findByIdAndUpdate(_id, { subscription: newSubscription });
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export default subscriptionUpdate;
