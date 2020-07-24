const User = require("../models/User");

const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utilities/ErrorResponse");
/**
 *
 * @description Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("The credentials are missing!", 400));
  }

  // try to find the user
  const user = await User.findOne({ email }).select("+password");

  // if not exists return a error message
  if (!user) {
    return next(new ErrorResponse("The credentials are invalid!", 401));
  }

  // verify if password match
  const isMatch = user.matchPassword(password);

  // if not exists return a error message
  if (!isMatch) {
    return next(new ErrorResponse("The credentials are invalid!", 401));
  }

  // if exists send a token and save at cookies
  res.status(200).json({
    token: user.getSignedJwtToken(),
    success: true,
  });
});

/**
 *
 * @description Register user
 * @route POST /api/v1/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorResponse("The resource already exists!", 409));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    token: user.getSignedJwtToken(),
    success: true,
  });
});

module.exports = {
  login,
  register,
};
