import Statuscodes from 'http-status-codes'

class ForbiddenError extends Error{
  constructor(message) {
    super(message)
    this.statusCode = Statuscodes.FORBIDDEN
  }
}

export default ForbiddenError