'use strict'

class TokenController {
  async create ({ request, response }) {
    const headers = request.headers()
    const body = request.post()

    switch (body.grant_type) {
      case 'password':
        await password()
        break
      case 'assertion':
        await assertion()
        break
      default:
        return response.send({
          error: 'not define grant_type'
        })
    }

    async function password () {
      return response.send({
        type: 'password'
      })
    }

    async function assertion () {
      let provider = ''

      switch (body.provider) {
        case 'twitter':
          provider = await twitter()
          break
        case 'facebook':
          provider = await facebook()
          break
        case 'google':
          provider = await google()
          break
        default:
          return response.send({
            error: 'not define provider'
          })
      }

      return response.send({
        type: 'assertion',
        provider: provider
      })
    }

    async function twitter () {
      return 'twitter'
    }

    async function facebook () {
      return 'facebook'
    }

    async function google () {
      return 'google'
    }
  }
}

module.exports = TokenController
