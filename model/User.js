const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  
  blogs:[{type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true}]
});

// // Hash the plain text password before saving
// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
