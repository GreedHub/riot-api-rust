use sysinfo::{ProcessExt, System, SystemExt};
use std::os::raw::c_char;
use std::ffi::CString;
use std::ffi::CStr;

#[derive(Debug)]
#[repr(C)]
pub struct RiotApiInfo  {
    pub port: i32,
    pub token: *mut c_char,
}

fn to_c_str(s:&str)->*mut c_char{
    CString::new(s).unwrap().into_raw()
}

fn c_str_to_string(cs:*mut c_char)->String{
    let cstring = unsafe {CStr::from_ptr(cs)};
    cstring.to_str().unwrap().to_owned()
}


#[no_mangle]
pub extern "C" fn get_riot_token() ->  RiotApiInfo{
    let mut riot_api_info =RiotApiInfo{
        port: 0,
        token: to_c_str(""),
    };

    let mut system = System::new();
    system.refresh_all();

    for p in system.processes_by_name("LeagueClient.exe") {
        for c in p.cmd(){
            if c.contains("--riotclient-app-port"){
                riot_api_info.port= c.split("=").last().unwrap().parse::<i32>().unwrap();

            }
            if c.contains("--riotclient-auth-token") {
                let t = c.split("=").last().unwrap();
                riot_api_info.token = to_c_str(t);
            }
        }
    }

    riot_api_info
}

#[no_mangle]
pub extern fn sum(n1:i32,n2:i32)->i32{
    n1+n2
}