var ref = require('ref-napi')
const ffi = require('ffi-napi')
const StructType = require('ref-struct-di')(ref)

const RiotApiInfo = StructType({
  port: ref.types.int32,
  token: ref.types.CString,
})

const lib = ffi.Library('../target/release/riot_process_info',{
  'get_riot_token': [RiotApiInfo,[]]
})

module.exports = lib