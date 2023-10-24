import mongoose from "mongoose";
import bryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
  },
  { timestamps: true }
);

//Save password with bcryptjs
userSchema.pre('save', async function() {
  const bcryptSalt = await bryptjs.genSalt(10)
  this.password = await bryptjs.hash(this.password, bcryptSalt)
})

//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
  const isMatch = await bryptjs.compare(enteredPassword, this.password)
  return isMatch
}

//Create JWT
userSchema.methods.createJWT = async function() {
  const token = jwt.sign({id: this._id}, process.env.JWT_SECRET)
  return token
}

const User = mongoose.model("User", userSchema);

export default User;
