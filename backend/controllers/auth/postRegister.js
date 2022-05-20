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
    // res.cookie('jwt', token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    // });

    res.status(201).json({
      user: {
        mail: user.mail,
        token,
        username: user.username,
        _id: user._id,
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
