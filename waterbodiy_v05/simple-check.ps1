# Simple Babel checker for Water Body Calculator
Write-Host "Checking Babel Configuration..." -ForegroundColor Cyan

# Check babel.config.js
if (Test-Path "babel.config.js") {
    Write-Host "✅ babel.config.js exists" -ForegroundColor Green
} else {
    Write-Host "❌ babel.config.js missing" -ForegroundColor Red
}

# Check babel-preset-expo
if (Test-Path "node_modules\babel-preset-expo") {
    Write-Host "✅ babel-preset-expo available" -ForegroundColor Green
} else {
    Write-Host "❌ babel-preset-expo missing" -ForegroundColor Red
}

# Check @babel/core
if (Test-Path "node_modules\@babel\core") {
    Write-Host "✅ @babel/core available" -ForegroundColor Green
} else {
    Write-Host "❌ @babel/core missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "Ready to start! Run: npm start" -ForegroundColor Cyan
