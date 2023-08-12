import User from "../../models/user.js";
import { HttpError, createVerifyEmail } from "../../helpers/index.js";
import { userEmailJoiSchema } from "../../schemas/users-schemas.js";
import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

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

    const verifyEmail = createVerifyEmail({
      email,
      verificationToken: user.verificationToken,
    });

    await sgMail.send(verifyEmail);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

export default retryVerificationRequest;
