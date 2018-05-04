'use strict'

const moment = require('moment')

class TokenController {
  async create ({ auth, request, response }) {
    try {
      const headers = request.headers()
      const { grant_type, username, password, refresh_token } = request.post()

      switch (grant_type) {
        case 'password':
          response.send(await passwordGrant())
          break
        case 'refresh_token':
          response.send(await refreshTokenGrant())
          break
        default:
          throw new Error('not define grant_type')
      }

      async function passwordGrant () {
        const token = await auth.withRefreshToken().attempt(username, password)
        const claim = JSON.parse(
          Buffer.from(token.token.split('.')[1], 'base64').toString()
        )

        return {
          access_token: token.token,
          token_type: token.type,
          expires_in: claim.exp - moment().unix(),
          refresh_token: token.refreshToken
        }
      }

      async function refreshTokenGrant () {
        const token = await auth
          .withRefreshToken()
          .generateForRefreshToken(refresh_token)
        const claim = JSON.parse(
          Buffer.from(token.token.split('.')[1], 'base64').toString()
        )

        return {
          access_token: token.token,
          token_type: token.type,
          expires_in: claim.exp - moment().unix(),
          refresh_token: token.refreshToken
        }
      }
    } catch (e) {
      return response.send({
        error: 'fuck'
      })
    }
  }

  async show ({ auth, request, response }) {
    try {
      return response.send(await auth.getUser())
    } catch (e) {
      return response.send({
        error: 'fuck'
      })
    }
  }
}

module.exports = TokenController
