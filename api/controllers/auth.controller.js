import PageNotFoundError from "../errors/Page-not-found.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({ username, email, password });

  res.status(201).json("User created successfully!");
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //Check for email
  const validUser = await User.findOne({ email });
  if (!validUser) throw new PageNotFoundError("User not found");

  //Check for password
  const validPassword = await validUser.comparePassword(password);
  if (!validPassword) throw new UnauthorizedError("Wrong credentials!");

  const token = await validUser.createJWT();
  const {password: pass, ...rest} = validUser._doc
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json(rest);
};

export const google = async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (user) {
    const token = await user.createJWT()
    const {password: pass, ...rest} = user._doc
    res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json(rest)
  }else {
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

    const newUser = {
      username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: generatedPassword,
      avatar: req.body.photo
    }
    const userDoc = await User.create(newUser)

    const token = userDoc.createJWT()
    const {password: pass, ...rest} = userDoc._doc

    res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json(rest)
  }
}
