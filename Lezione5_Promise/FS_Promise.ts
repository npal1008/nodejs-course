import { promises, readFile } from 'fs';
 
promises.readFile('./prova.txt', 'utf-8').then((file) => {
    console.log(file);
    return promises.readFile('./prova.txt', 'utf-8');
}).then(file => {
    console.log(file);
}).catch((error) =>{
    console.log('ERROR');
    console.log(error);
});

readFile('./prova.txt', 'utf-8', (error, file) => {
    if (error != undefined){
        console.log('ERROR');
        console.log(error);
    } else {
        console.log(file);
        readFile('./prova.txt', 'utf-8', (error, file) => {
            if (error != undefined) {

            } else {

            }
        });
    }
});