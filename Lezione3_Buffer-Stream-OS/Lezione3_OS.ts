//import {arch} from 'os';
import * as os from 'os';

//console.log(os.arch());

//console.log(os.cpus().length);

//console.log(os.homedir());

/*console.log(os.platform());
if(os.platform() == "linux"){
    //Do something
} else if (os.platform() == "win32"){
    //Something else
}*/

//console.log(os.userInfo());

console.log('Total GB of RAM: ' + (os.totalmem()/1000000000));