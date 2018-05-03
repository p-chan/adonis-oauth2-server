'use strict'

class TokenController {
  async create ({ request, response }) {
    try {
      const headers = request.headers()
      const body = request.post()

      return response.send({
        type: 'password'
      })
    } catch (e) {
      return response.send({
        error: 'fuck'
      })
    }
  }
}

module.exports = TokenController
