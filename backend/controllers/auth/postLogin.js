const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const signToken = id => {
//   jwt.sign({ id }, secret, expires);
// };

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // first document will returned if the condition will be fulfilled
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      // SEND jwt
      const token = jwt.sign(
        { userId: user._id, mail },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      );
      // res.cookie('jwt', token, {
      //   expires: new Date(
      //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      //   ),
      //   httpOnly: true,
      //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      // });

      return res.status(200).json({
        user: {
          mail: user.mail,
          token,
          username: user.username,
          _id: user._id,
        },
      });
    }

    return res.status(404).json({
      status: res.statusCode,
      message: 'Invalid credentials. Please try again',
    });
  } catch (err) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'Something went wrong. Please try again!',
    });
  }
};

module.exports = postLogin;
