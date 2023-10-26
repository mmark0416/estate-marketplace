import UnauthorizedError from "../errors/Unauthorized.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({ msg: "Working" });
};

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthorizedError("You can only update your account!");

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updateUser._doc;

  res.status(200).json(rest);
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthorizedError("You can only delete your own account!");
  await User.findByIdAndDelete(req.params.id);

  res.clearCookie('access_token').status(200).json("User has been deleted");
};

export const getListing = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new UnauthorizedError("You can only view your own listings!");
  const listing = await Listing.find({ userRef: req.user.id });
  res.status(200).json(listing);
};