import * as fs from 'fs';

let file = fs.readFileSync('test.txt', 'utf-8');
//console.log(file);

let rStream = fs.createReadStream('test.txt', 'utf-8');

rStream.on('end', () => {
    console.log('STREAM CONCLUSO');
});

rStream.on('data', function(chunk){
    console.log('CHUNK');
    console.log(chunk);
});

rStream.on('open', () => {
    console.log('STREAM APERTO');
});8