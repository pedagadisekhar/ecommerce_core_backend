import app from './app';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 8000;

// Load SSL certificate and key
const sslKeyPath = path.resolve(__dirname, './certs/key.pem');
const sslCertPath = path.resolve(__dirname, './certs/cert.pem');

const options = {
  key: fs.readFileSync(sslKeyPath),
  cert: fs.readFileSync(sslCertPath)
};

// Create an HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Secure server running on https://localhost:${port}`);
});

