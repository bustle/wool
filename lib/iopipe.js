import config from './config'
import iopipe from 'iopipe'
const iopipeHandler = iopipe({ clientId: config.IOPIPE_TOKEN })

export default function (handler) {
  return config.ENV === 'development' ? handler : iopipeHandler(handler)
}
