// Mongoose ke Schema aur mongoose ko import kiya
import mongoose, { Schema } from 'mongoose';

// JWT for token generation
import jwt from 'jsonwebtoken';

// bcrypt password ko hash karne ke liye
import bcrypt from 'bcrypt';

// User schema define kar rahe hain
const userSchema = new Schema(
  {
    // username unique hona chahiye, lowercase, trimmed aur indexed (search fast karega)
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // email bhi unique hona chahiye
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Full name of user
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Profile image ka URL (Cloudinary ya kisi aur ka)
    avatar: {
      type: String,
      required: true,
    },

    // Optional cover image (like FB banner)
    coverImage: {
      type: String,
    },

    // Watch history ka array — har item ek video ka ObjectId hoga
    watchHistory: [
      {
        type: Schema.Types.ObjectID,
        ref: 'Video', // Video schema se linked
      },
    ],

    // Password field
    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    // JWT refresh token store karne ke liye
    refreshToken: {
      type: String,
    },
  },
  {
    // Automatically createdAt and updatedAt add ho jaayega
    timestamps: true,
  }
);

// Save hone se pehle ye function chalega (middleware)
// Password hash karne ke liye use hota hai
userSchema.pre('save', async function (next) {
  // Agar password modify nahi hua hai to next() call karo, hash mat karo
  if (this.isModified('password')) return next();

  // Agar modify hua hai to password hash karo
  this.password = bcrypt.hash(this.password, 10); // 10 is the salt rounds
  next();
});

// Ye method check karega ki entered password aur stored password same hai ya nahi
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Ye method access token banata hai JWT ke zariye
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key env file se
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Token kab expire hoga
    }
  );
};

// Ye method refresh token banata hai
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key env file se
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Token expire hone ka time
    }
  );
};

// Is schema ko model bana ke export kar rahe hain
export const User = mongoose.model('User', userSchema);
 