const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/calculator/')) {
        // Redirecionar solicitações de operações para o backend Quarkus
        const backendUrl = `http://localhost:8080${req.url}`;
        proxyRequest(req, res, backendUrl);
    } else {
        // Servir arquivos estáticos
        const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        const contentType = getContentType(filePath);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

function proxyRequest(req, res, targetUrl) {
    const proxy = http.request(targetUrl, backendRes => {
        res.writeHead(backendRes.statusCode, backendRes.headers);
        backendRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
}

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
