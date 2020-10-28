//import * as path from 'path';
import { sep, delimiter, 
    basename, 
    dirname,
    extname,
    isAbsolute,
    join,
    normalize,
    parse,
    relative,
    resolve } from 'path';

/*console.log("Delimiter: " + delimiter);
console.log("Separator: " + sep);*/

let path;
let absolutePath;
let fakePath;

path = "./test.txt";
absolutePath = "D:/Corso Node/Lezione2 - Path/test.txt";
fakePath = "D:/Corso.Node/Lezione2 - Path/test";

/**
 * Estrae il basename (nome del file) dal path 
 */
/*let fileBasename = basename(path, '.txt');
console.log("Basename: " + fileBasename);*/

/**
 * Estrae il nome della direcotry del file
 */
/*let directoryName = dirname(absolutePath);
console.log("Dirname: " + directoryName);*/

/**
 * Estrae l'estensione di un file
 */
/*let extensionName = extname(fakePath);
console.log("Extesion name: " + extensionName);*/

/**
 * Controlla se il path è assoluto o meno
 */
/*let absolute = isAbsolute(absolutePath);
console.log("Absolute: " + absolute);*/

/**
 * Concatena due o più path
 */
/*let joinedPath = join(dirname(absolutePath), path);
console.log("Joined: " + joinedPath);*/

/**
 * Elimina i riferimenti relativi da un path
 */
/*let beforeNormalization = dirname(absolutePath) + "/../Lezione2 - Path/" + path;
let normalizedPath = normalize(beforeNormalization);
console.log("Before norm: " + beforeNormalization);
console.log("After norm: " + normalizedPath);*/

/**
 * Estrae tutte le info da un path
 */
/*let parsedPath = parse(absolutePath);
console.log(parsedPath.ext)*/

/**
 * Ritorna il path relativo dal primo al secondo parametro fornito
 */
/*let first = "D:/Corso Node/";
let second = "test.txt";
let relativePath = relative(first, second);
console.log("Relative: " + relativePath);*/

/**
 * Risolve il path da relativo a assoluto
 */
/*let resolvedPath = resolve('../Lezione2 - Path/test.txt');
console.log("Resolved: " + resolvedPath);*/