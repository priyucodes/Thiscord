const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require(`jsonwebtoken`);

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // Check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });
    if (userExists) {
      // 409 conflict resource already exist
      return res.status(409).json({
        status: res.statusCode,
        message: 'User already exists with this email',
      });
    }

    // HASH(ENCRYPT) PASSWORD
    const encryptedPassword = await bcrypt.hash(password, 10); // how many character will be added extra to the password

    // create user document and save in DB
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // Create JWT token
    const token = jwt.sign({ userId: user._id, mail }, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    res.status(201).json({
      user: {
        mail: user.mail,
        token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: res.statusCode,
      message: 'Error Occured. Please try again!',
    });
  }
};
module.exports = postRegister;
