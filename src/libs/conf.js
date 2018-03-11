import defaultConf from "../../config/default.json"
import productionConf from "../../config/production.json"
import merge from "lodash.merge"

let conf = merge({}, defaultConf)

// When we build for production, merge production conf
if (process.env.NODE_ENV === "production") {
  conf = merge(conf, productionConf)
}

export default conf
