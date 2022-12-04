use sysinfo::{ProcessExt, System, SystemExt};
use std::os::raw::c_char;
use std::ffi::CString;

#[repr(C)]
pub struct RiotApiInfo  {
    pub port: *mut c_char,
    pub token: *mut c_char,
}

fn to_c_str(s:&str)->*mut c_char{
    CString::new(s).unwrap().into_raw()
}


#[no_mangle]
pub extern fn  get_riot_token() ->  RiotApiInfo{
    let mut riot_api_info =RiotApiInfo{
        port: to_c_str(""),
        token: to_c_str(""),
    };

    let mut system = System::new();
    system.refresh_all();

    for p in system.processes_by_name("LeagueClient.exe") {
        for c in p.cmd(){
            if c.contains("--riotclient-app-port"){
                let p = c.split("=").last().unwrap();
                riot_api_info.port= to_c_str(p);

            }
            if c.contains("--riotclient-auth-token") {
                let t = c.split("=").last().unwrap();
                riot_api_info.token= to_c_str(t);
            }
        }
    }

    riot_api_info
}