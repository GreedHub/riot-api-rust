const ps = require('ps-node')

async function getLeagueApiInfo() {
    const options = {
      command: 'LeagueClientUx',
      psargs: 'ux',
    }
  
    return new Promise((resolve, reject) => {
      ps.lookup(options, (err, resultList) => {
        if (err) return reject(err)
        if (resultList.length === 0)
          return reject('No league client process found')
  
        let apiInfo = {
          token: '',
          port: '',
        }
        let i = 0
  
        while (!apiInfo.token && !apiInfo.port) {
          const process = resultList[i]
  
          const token = process.arguments
            .find((arg) => /--remoting-auth-token=(.+?)/.test(arg))
            ?.split('=')[1]
  
          const port = process.arguments
            .find((arg) => /--app-port=(.+?)/.test(arg))
            ?.split('=')[1]
  
          if (token) apiInfo = { ...apiInfo, token }
          if (port) apiInfo = { ...apiInfo, port }
  
          i++
  
          if (i >= resultList.length) throw new Error('Cannot get api info')
        }
  
        resolve(apiInfo)
      })
    })
  }


  
module.exports = {getLeagueApiInfo}