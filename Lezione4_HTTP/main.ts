import { request404 } from './HTTPRequest';
import axios from 'axios';
import { server } from './HTTPServer';

server.listen(2000, () => {
    console.log('Server started');

    axios.get('http://localhost:2000/qwerty')
    .then((result) => {
        console.log('HTTP REQUEST OK');
        return axios.get('http://localhost:2000/html');
    }).then((result) => {
        console.log('HTTP REQUEST OK 2');
    }).catch((error) => {
        console.log('HTTP REQUEST KO');
    });
});