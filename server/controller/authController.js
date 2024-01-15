const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { signAccessToken } = require('./jwtController');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(405).send('Field Missing');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Username or email is already taken' });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    const accessToken = await signAccessToken(savedUser.email);

    res.json({ accessToken });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Server Error');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(405).send('Field Missing');
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(402).json({ error: "User doesn't Exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = await signAccessToken(user.email);
    const role = user.role;
    res.json({ email, role, accessToken });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Server Error');
  }   
};

const logoutUser = (req, res) => {
  delete accessToken;
  res.status(200).send('Logout Successfully');
};

module.exports = { createUser, loginUser, logoutUser };
