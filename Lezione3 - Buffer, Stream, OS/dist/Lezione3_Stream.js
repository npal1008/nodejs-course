"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let file = fs.readFileSync('test.txt', 'utf-8');
//console.log(file);
/**
 * Lettura in flowing mode
 */
/*let rStream = fs.createReadStream('test.txt', {
    encoding: 'utf-8',
    highWaterMark: 8
});

let completeFile = '';

rStream.on('end', () => {
    console.log('STREAM CONCLUSO');
    console.log(completeFile);
});

rStream.on('data', function(chunk){
    console.log('CHUNK');
    completeFile += chunk;
});

rStream.on('open', () => {
    console.log('STREAM APERTO');
});*/
/**
 * Lettura in paused mode
 */
/*let rStream = fs.createReadStream('./test.txt', {
    encoding: 'utf-8',
    highWaterMark: 8
});

rStream.on('end', () => {
    console.log('STREAM CONCLUSO');
});

rStream.on('readable', () => {
    let chunk;
    while ((chunk = rStream.read()) != null) {
        console.log('CHUNK');
        console.log(chunk);
    }
    let id = setInterval(() => {
        console.log('CHUNK');
        console.log(chunk);
        chunk = rStream.read();
        if(chunk == null){
            clearInterval(id);
        }
    }, 2000);
});*/
/**
 * Creare un Writable
 */
/*let wStream = new Writable();

wStream._write = (chunk, encoding, next) => {
    //console.log(chunk.toString());
    fs.appendFileSync('./test.txt', chunk.toString());
    next();
}

wStream.write('Written chunk!');*/
/**
 * fs.createWriteStream
 */
/*let wStream = fs.createWriteStream('./test.txt', {
    flags: 'a'
});
wStream.write('\n\nWritten from fs.createWriteStream\n');*/
/**
 * Copia file mediante stream
 */
let rStream = fs.createReadStream('./test.txt');
let wStream = fs.createWriteStream('./test_copy.txt');
rStream.pipe(wStream);
//# sourceMappingURL=Lezione3_Stream.js.map