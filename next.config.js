const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error
}

const parsedVariables = dotEnvResult.parsed || {}
const dotEnvVariables = {}

for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key]
}
module.exports = {
  env: {
    ...dotEnvVariables
  }
}

const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  env: {
    ...dotEnvVariables
  },
  webpack(config, options) {
    return config
  }
});
