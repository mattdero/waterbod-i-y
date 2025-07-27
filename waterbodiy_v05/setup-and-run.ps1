# PowerShell script to set up and run the Water Body Calculator app

Write-Host "🌊 Setting up Water Body Calculator App..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "C:\Users\mpder\waterbodiy_v05"

Write-Host "📂 Current directory: $(Get-Location)" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not available" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Check if babel-preset-expo is available
if (Test-Path "node_modules\babel-preset-expo") {
    Write-Host "✅ babel-preset-expo is available" -ForegroundColor Green
} else {
    Write-Host "🔧 Installing babel-preset-expo..." -ForegroundColor Yellow
    npm install --save-dev babel-preset-expo@~11.0.0
}

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting the development server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray

# Start the Expo development server
npx expo start

Write-Host "👋 Development server stopped." -ForegroundColor Yellow
