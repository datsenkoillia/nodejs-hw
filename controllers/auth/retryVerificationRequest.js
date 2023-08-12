import User from "../../models/user.js";
import { HttpError, createAndSendVerifyEmail } from "../../helpers/index.js";
import { userEmailJoiSchema } from "../../schemas/users-schemas.js";

const retryVerificationRequest = async (req, res, next) => {
  try {
    const { error } = userEmailJoiSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, "User with this email not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    createAndSendVerifyEmail({
      email,
      verificationToken: user.verificationToken,
    });

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

export default retryVerificationRequest;
