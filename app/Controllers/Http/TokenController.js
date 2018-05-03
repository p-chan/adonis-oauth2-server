'use strict'

const moment = require('moment')

class TokenController {
  async create ({ auth, request, response }) {
    try {
      const headers = request.headers()
      const { username, password } = request.post()

      const token = await auth.withRefreshToken().attempt(username, password)
      const claim = JSON.parse(
        Buffer.from(token.token.split('.')[1], 'base64').toString()
      )

      return response.send({
        access_token: token.token,
        token_type: token.type,
        expires_in: claim.exp - moment().unix(),
        refresh_token: token.refreshToken
      })
    } catch (e) {
      return response.send({
        error: 'fuck'
      })
    }
  }
}

module.exports = TokenController
