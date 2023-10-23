import Statuscodes from 'http-status-codes'

class BadRequestError extends Error{
  constructor(message) {
    super(message)
    this.statusCode = Statuscodes.BAD_REQUEST
  }
}

export default BadRequestError