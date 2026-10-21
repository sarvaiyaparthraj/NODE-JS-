import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: true,
      validate: {
        validator(value) {
          return !/password/i.test(value);
        },
        message: "Password cannot contain the word 'password'.",
      },
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.findByCredential = async function (email, password) {
  if (!email || !password) throw new Error("Email and password are required");

  const user = await this.findOne({ email: email.toLowerCase().trim() });
  if (!user) throw new Error("Invalid email or password");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new Error("Invalid email or password");

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");

  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "9d",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
