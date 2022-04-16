expect.extend({
  toBeValidationError (received, msg) {
    if (!msg || typeof msg !== 'string') {
      throw new Error('Expected msg to be a string')
    }
    if (!received.body || !received.body.errors || !Array.isArray(received.body.errors)) {
      throw new Error('Expected received to be a HTTP response with body and an array of errors')
    }
    const pass = received.body.errors.some(error => error.msg === msg)
    return {
      pass,
      message: () => pass
        ? `Expected not to have '${msg}' validation error`
        : `Expected to have '${msg}' validation error`
    }
  }
})
