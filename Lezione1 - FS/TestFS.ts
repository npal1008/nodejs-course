import * as fs from 'fs';

let id;
let file;

/**
 * Apre e chiude il file test.txt printando il file descriptor
 */
id = fs.openSync('./test.txt', 'r');
console.log('ID file: ' + id);

fs.closeSync(id);
console.log('File chiuso');

/**
 * Legge il contenuto di test.txt e lo printa
 */
file = fs.readFileSync('./test.txt', 'utf-8');
console.log(file);

/**
 * Legge il file test.txt in modo asincrono
 */
fs.readFile('./test.txt', 'utf-8', function(err, data){ console.log(data) });
console.log('Istruzione successiva');

/**
 * Legge il contenuto del file mediante file descriptor. Non sappiamo ancora quale è la dimensione del file per allocare correttamente il buffer
 */
id = fs.openSync('./test.txt', 'r');
let buf = Buffer.alloc(20);
file = fs.readSync(id, buf, 0, 20, null);
console.log(buf.toString('utf-8'));
fs.closeSync(id);


/**
 * Scrive sul file creato.txt sia in modalità overwrite che in modalità append
 */
let str = 'Contenuto salvato da NodeJS2';
fs.writeFileSync('./creato.txt', str);
fs.appendFileSync('./creato.txt', str);


/**
 * Cancella il file creato.txt
 */
fs.unlinkSync('./creato.txt')

/**
 * Legge il contenuto della directory corrente
 */
let contenuto = fs.readdirSync('./');
console.log(contenuto)


/**
 * Crea una directory
 */
fs.mkdirSync('./directory/sottodirectory', {recursive: true});

/**
 * Rimuove ledirectory precedentemente create
 */
fs.rmdirSync('./directory/sottodirectory');
fs.rmdirSync('./directory');