const asyncHandler = require('../middlewares/async');

/**
 *
 * @description Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(
      'The credentials are invalid!',
      400
    ));
  }

  // try to find the user
    // if not exists return a error message
      // 'The credentials are invalid!', 400
    // if exists send a token and save at cookies
});

/**
 *
 * @description Register user
 * @route POST /api/v1/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res, next) => {

});

module.exports = {
  login,
  register
};
