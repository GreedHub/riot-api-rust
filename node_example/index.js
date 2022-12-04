const rustLib = require("./with-rust")
const jsLib = require("./node-only")

const main = async ()=>{

  console.log("Reading API info only with JS, please wait...")
  console.time("only-js")
  let apiInfoJs = await jsLib.getLeagueApiInfo()
  console.timeEnd("only-js")
  console.log(apiInfoJs)

  console.log("Reading API info with Rust, please wait...")
  console.time("with-rust")
  const apiInfoRust = rustLib.get_riot_token() 
  console.timeEnd("with-rust")
  console.log(apiInfoRust.toJSON())

}

main()