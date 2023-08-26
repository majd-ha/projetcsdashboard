const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SEC, { expiresIn: "1h" });
};
module.exports = {
  //login a user
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw Error("all feilds must be filled");
      }
      if (!validator.isEmail(email)) {
        throw Error("please enter a valid email");
      }
      const exist = await User.findOne({ email: email });
      if (exist) {
        const auth = await bcrypt.compare(password, exist.password);
        if (auth) {
          const token = createToken(exist._id);

          res.status(201).json({
            email: exist.email,
            token: token,
          });
        } else {
          throw Error("password is incorect");
        }
      } else {
        throw Error("email not rejstered");
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ msg: "email already registered" });
      }
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },
  //canceled
  // signupUser: async (req, res) => {
  //   console.log(req.body);
  //   const { email, password } = req.body;

  //   try {
  //     if (!email || !password) {
  //       throw Error("all feilds must be filled");
  //     }
  //     if (!validator.isEmail(email)) {
  //       throw Error("please enter a valid email");
  //     }
  //     const salt = await bcrypt.genSalt(10);
  //     const hash = await bcrypt.hash(password, salt);
  //     const user = await User.create({
  //       email,
  //       password: hash,
  //     });
  //     const token = createToken(user._id);

  //     res.status(201).json({
  //       email: user.email,
  //       token: token,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
