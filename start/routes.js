'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const User = use('App/Models/User')

Route.group(() => {
  Route.post('oauth2/token', 'TokenController.create')
  Route.get('oauth2/token/info', 'TokenController.show').middleware('auth')
  Route.post('users', 'UserController.create')
}).prefix('v1')
