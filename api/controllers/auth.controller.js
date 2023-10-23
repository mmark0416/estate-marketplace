import User from '../models/user.model.js'

export const signUp = async (req, res) => {
  const {username, email, password} = req.body
  await User.create({username, email, password})

  res.status(201).json('User created successfully!')
}