import * as fs from 'fs';

let buf;

/*buf = Buffer.from([1, 2, 3]);
console.log(buf);*/

buf = Buffer.from('Hello!');
/*console.log('Buffer length: ' + buf.length);
/*for(let i=0; i<buf.length; i++){
    console.log(buf[i]);
}
for(let item of buf){
    console.log(item);
}*/

/*buf[2] = 33;

console.log(buf);
console.log(buf.toString());*/

buf = fs.readFileSync('img.jpg');
console.log(buf);
for(let i=10000; i<buf.length; i++){
    buf[i] = 75;
}
console.log(buf);
fs.writeFileSync('img2.jpg', buf);