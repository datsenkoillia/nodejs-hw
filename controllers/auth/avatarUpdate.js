import User from "../../models/user.js";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";

const avatarUpdate = async (req, res, next) => {
  try {
    const { avatarURL, _id } = req.user;
    const { path: tmpAvatarPath } = req.file;

    const avatarsPath = path.resolve("public", "avatars");

    const newFileName = `${_id}_avatar.jpg`;

    const userAvatarPath = path.join(avatarsPath, newFileName);

    await Jimp.read(tmpAvatarPath)
      .then((avatar) => {
        avatar.resize(250, 250).write(userAvatarPath);
        fs.unlink(tmpAvatarPath);
      })
      .catch((error) => {
        throw error;
      });

    const newAvatarURL = path.join("avatars", newFileName);

    await User.findByIdAndUpdate(_id, { avatarURL: newAvatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export default avatarUpdate;
