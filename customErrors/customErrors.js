class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "NotFoundError"
    this.statusCode = 404
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = "BadRequestError"
    this.statusCode = 400
  }
}

class AccessError extends Error {
  constructor(message) {
    super(message)
    this.name = "AccessError"
    this.statusCode = 403
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = "UnauthorizedError"
    this.statusCode = 401
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.name = "ConflictError"
    this.statusCode = 409
  }
}

export {
  NotFoundError,
  BadRequestError,
  AccessError,
  UnauthorizedError,
  ConflictError,
}
