import mongoose from "mongoose";
import bryptjs from 'bcryptjs'

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
  },
  { timestamps: true }
);

//Save password with bcryptjs
userSchema.pre('save', async function() {
  const bcryptSalt = await bryptjs.genSalt(10)
  this.password = await bryptjs.hash(this.password, bcryptSalt)
})

const User = mongoose.model("User", userSchema);

export default User;
