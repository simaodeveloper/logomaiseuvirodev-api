const errorsHandler = (err, req, res, next) => {
  // console.error(err.stack)
  console.error()
  res.status(err.statusCode).send(err.message)
}

module.exports = errorsHandler
