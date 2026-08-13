import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dotenv from backend/.env or root
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import app from './app.js';
import { connectDB } from './config/db.js';

const DEFAULT_PORT = process.env.PORT || 5000;

// Start Server & Database Connection
const startServer = async () => {
  console.log('🚀 Initializing CivicFix Backend Server...');
  await connectDB();

  const server = app.listen(DEFAULT_PORT, () => {
    console.log(`🌐 CivicFix API Server running in ${process.env.NODE_ENV || 'development'} mode on port ${DEFAULT_PORT}`);
    console.log(`📡 Health Check URL: http://localhost:${DEFAULT_PORT}/api/health`);
    console.log(`📋 Complaints API URL: http://localhost:${DEFAULT_PORT}/api/complaints`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${DEFAULT_PORT} is already in use by another process.`);
      console.error(`   To free port ${DEFAULT_PORT}, kill the existing process or set PORT in backend/.env`);
    } else {
      console.error(`❌ Server error: ${err.message}`);
    }
  });
};

startServer();
