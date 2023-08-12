import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import User from "../../models/user.js";
import { HttpError, createAndSendVerifyEmail } from "../../helpers/index.js";
import { userJoiSchema } from "../../schemas/users-schemas.js";


const register = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      verificationToken,
    });
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });

    createAndSendVerifyEmail({ email, verificationToken });

  } catch (error) {
    next(error);
  }
};

export default register;
