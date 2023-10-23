import Statuscodes from 'http-status-codes'

class PageNotFoundError extends Error{
  constructor(message) {
    super(message)
    this.statusCode = Statuscodes.PageNotFound
  }
}

export default PageNotFoundError