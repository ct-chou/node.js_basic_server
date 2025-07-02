const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer();

//listen for requests
server.on('request', (req, res) => {
    
    let safePath = '';
    if (req.url === '/') {
        safePath = 'index.html';
    } else {
        // Remove any path traversal attempts
        safePath = req.url.replace(/^\/+/, '').replace(/\.\.\//g, '');
    }
    const filePath = path.join(__dirname, safePath);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            const filePath404 = path.join(__dirname, '404.html');
            fs.readFile(filePath404, (err404, data404) => {
                if (err404) {
                    console.error('Error reading 404.html:', err404);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(data404);
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    

});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
}); 