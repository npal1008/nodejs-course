import * as http from 'http';

export function request404() {
    let options = {
        method: 'POST',
        hostname: '127.0.0.1',
        port: 2000,
        path: '/uploadssss',
        headers: {
            'Content-Type': 'text/plain'
        }
    };
    
    let req = http.request(options, function (res) {
        let chunks: Array<any> = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function (chunk) {
            let body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    
        res.on("error", function (error) {
            console.error(error);
        });
    });
    
    let postData = "Body request 1\r\n";
    
    req.write(postData);
    
    req.end();
}