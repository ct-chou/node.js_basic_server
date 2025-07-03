const express = require('express');
const app = express();
const fs = require('node:fs');
const path = require('node:path');




app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '404.html'));
        }
    });
});

app.get('/contact-me.html', (req, res) => {
    const filePath = path.join(__dirname, 'contact-me.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '404.html'));
        }
    });
});

app.get('/about.html', (req, res) => {
    const filePath = path.join(__dirname, 'about.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '404.html'));
        }
    });
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// //listen for requests
// server.on('request', (req, res) => {
    
//     let safePath = '';
//     if (req.url === '/') {
//         safePath = 'index.html';
//     } else {
//         // Remove any path traversal attempts
//         safePath = req.url.replace(/^\/+/, '').replace(/\.\.\//g, '');
//     }
//     const filePath = path.join(__dirname, safePath);
    
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             const filePath404 = path.join(__dirname, '404.html');
//             fs.readFile(filePath404, (err404, data404) => {
//                 if (err404) {
//                     console.error('Error reading 404.html:', err404);
//                     res.writeHead(500, { 'Content-Type': 'text/plain' });
//                     res.end('Internal Server Error');
//                     return;
//                 }
//                 res.writeHead(404, { 'Content-Type': 'text/html' });
//                 res.end(data404);
//             });
//             return;
//         }
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     });
    

// });

// server.listen(8080, () => {
//     console.log('Server is running on http://localhost:8080');
// }); 