'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Logger = use('Logger')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    response.status(error.status).send({
      error: {
        code: error.status,
        message: error.message
      }
    })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    if (Env.get('NODE_ENV') === 'development') {
      Logger.level = 'debug'
    }

    Logger.debug('[%d] %s - %s', error.status, error.name, error.message)
  }
}

module.exports = ExceptionHandler
