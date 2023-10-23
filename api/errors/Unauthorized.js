import Statuscodes from 'http-status-codes'

class UnauthorizedError extends Error{
  constructor(message) {
    super(message)
    this.statusCode = Statuscodes.Unauthorized
  }
}

export default UnauthorizedError