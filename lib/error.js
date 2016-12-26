'use strict';
import { airbrakeConfig } from 'shep-config'
const airbrake = require('airbrake').createClient(airbrakeConfig.projectId, airbrakeConfig.projectKey)

export default function errorHandler(err, callback) {
  logger.error({ message: err, type: "LambaRuntimeException" })
  airbrake.notify(err, callback)
  callback(err)
}
