const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data', 'db');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`Created data directory at ${dataDir}`);
}

// Start MongoDB
console.log('Starting MongoDB...');
const mongod = spawn('mongod', ['--dbpath', dataDir]);

mongod.stdout.on('data', (data) => {
  console.log(`MongoDB: ${data}`);
});

mongod.stderr.on('data', (data) => {
  console.error(`MongoDB Error: ${data}`);
});

mongod.on('close', (code) => {
  console.log(`MongoDB process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down MongoDB...');
  mongod.kill('SIGINT');
  process.exit();
});

console.log('MongoDB is running. Press Ctrl+C to stop.'); 