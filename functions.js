class ErrorObject extends Error {
  constructor(message, statusCode, errors = []) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}

const undefinedValidator = (parameter, value) => {
  if (value !== undefined && value !== null && value.length > 0) {
    return true
  }
  throw new ErrorObject(`Undefined value of ${parameter}`, 400)
}

module.exports = {
  ErrorObject,
  undefinedValidator,
}
