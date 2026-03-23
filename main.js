const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let backendProcess;

function startBackend() {
  const backendPath = path.join(__dirname, 'backend', 'dist', 'app.js');
  backendProcess = spawn(process.execPath, [backendPath], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend finalizado com código ${code}`);
  });
}

function waitForBackend(timeoutMs = 10000) {
  const startedAt = Date.now();

  return new Promise((resolve) => {
    const tryConnect = () => {
      const req = http.get('http://127.0.0.1:3000/health', (res) => {
        res.resume();
        resolve(res.statusCode === 200);
      });

      req.on('error', () => {
        if (Date.now() - startedAt >= timeoutMs) {
          resolve(false);
          return;
        }
        setTimeout(tryConnect, 350);
      });
    };

    tryConnect();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 980,
    minHeight: 680,
    backgroundColor: '#0f172a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'frontend', 'index.html'));
}

app.whenReady().then(async () => {
  startBackend();
  await waitForBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (backendProcess) backendProcess.kill();
});
