import UnauthorizedError from "../errors/Unauthorized.js"
import User from "../models/user.model.js"

export const test = (req, res) => {
  res.json({msg: 'Working'})
}

export const updateUser = async (req, res) => {
  if(req.user.id !== req.params.id) throw new UnauthorizedError('You can only update your account!')

  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    $set:{
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    }
  }, {new: true})

  const {password, ...rest} = updateUser._doc

  res.status(200).json(rest)
}