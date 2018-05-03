'use strict'

const User = use('App/Models/User')

class UserController {
  async create ({ request, response }) {
    try {
      const headers = request.headers()
      const body = request.post()

      // Create new user
      const user = new User()

      user.username = body.username
      user.email = body.email
      user.password = body.password

      await user.save()

      // Fetch new user
      const userInfo = await User.query()
        .where({
          username: body.username
        })
        .setHidden(['password'])
        .fetch()

      return response.send(userInfo.toJSON()[0])
    } catch (e) {
      return response.send({
        error: 'fuck'
      })
    }
  }
}

module.exports = UserController
