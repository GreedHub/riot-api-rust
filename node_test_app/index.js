var ref = require('ref-napi');
const ffi = require('ffi-napi')
const express = require('express')
const StructType = require('ref-struct-di')(ref)


const app = express()

var char = ref.types.char
var charPtr = ref.refType(char)

const i32 = ref.types.int32

const RiotApiInfo = StructType({
  token:charPtr,
  port:i32
})

const lib = ffi.Library('../target/release/riot_process_info',{
  'sum': [i32,[i32,i32]],
  'get_riot_token': [RiotApiInfo,[i32]]
})


app.get("/",async (req,res)=>{
  console.log(`reading`)

  let resp = await lib.sum(1,2)
  console.log(`readin2`)
  
  console.log(`read`,{resp})

  res.json(resp)
})





app.listen(5000,()=>{

})