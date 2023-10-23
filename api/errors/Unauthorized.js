import Statuscodes from 'http-status-codes'

class UnauthorizedError extends Error{
  constructor(message) {
    super(message)
    this.statusCode = Statuscodes.UNAUTHORIZED
  }
}

export default UnauthorizedError