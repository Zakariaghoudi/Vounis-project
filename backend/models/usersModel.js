const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: Number,
    description: String,
    skills: String,
    profilePhoto: {
      type: String,
      default:
        "https://imgs.search.brave.com/r7Qi5JTwndiR9gE6Rl063MSfdV531BkFlGefnvqh1yk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/Ni8zMC8xMC8yMy9p/Y29uLTUzNTU4OTZf/NjQwLnBuZw",
    },
    role: {
      type: String,
      enum: ["volunteer", "host"],
      default: "volunteer",
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports  = mongoose.model("User", userSchema);


