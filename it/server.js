const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'email_log.txt');
const RATE_LIMIT = 30000; // 30 seconds in milliseconds
let lastEmailTime = 0;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.method === 'POST' && req.url === '/send-email') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const now = Date.now();
            if (now - lastEmailTime < RATE_LIMIT) {
                res.writeHead(429);
                res.end('Too many requests. Please wait before sending another email.');
                return;
            }
            lastEmailTime = now;

            const email = JSON.parse(body);
            const logEntry = `${new Date().toISOString()} - Sent email to: ${email.to}\nMessage: ${email.message}\n\n`;
            
            fs.appendFile(LOG_FILE, logEntry, (err) => {
                if (err) {
                    console.error('Error writing to log file', err);
                    res.writeHead(500);
                    res.end('Error logging email');
                } else {
                    res.writeHead(200);
                    res.end('Email sent and logged successfully');
                }
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});