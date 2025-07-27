# Quick Babel setup checker for Water Body Calculator

Write-Host "🔍 Checking Babel Configuration..." -ForegroundColor Cyan

# Check if babel.config.js exists
if (Test-Path "babel.config.js") {
    Write-Host "✅ babel.config.js exists" -ForegroundColor Green
    Write-Host "Content:" -ForegroundColor Gray
    Get-Content "babel.config.js" | Write-Host -ForegroundColor White
} else {
    Write-Host "❌ babel.config.js not found" -ForegroundColor Red
}

Write-Host ""

# Check if babel-preset-expo is available
if (Test-Path "node_modules\babel-preset-expo") {
    Write-Host "✅ babel-preset-expo is installed" -ForegroundColor Green
} else {
    Write-Host "❌ babel-preset-expo not found" -ForegroundColor Red
    Write-Host "Run: npm install --save-dev babel-preset-expo" -ForegroundColor Yellow
}

# Check package.json for babel dependencies
Write-Host ""
Write-Host "📦 Checking package.json dependencies..." -ForegroundColor Cyan
$packageJson = Get-Content "package.json" | ConvertFrom-Json

if ($packageJson.devDependencies.PSObject.Properties.Name -contains "@babel/core") {
    Write-Host "✅ @babel/core: $($packageJson.devDependencies.'@babel/core')" -ForegroundColor Green
} else {
    Write-Host "❌ @babel/core not found" -ForegroundColor Red
}

if ($packageJson.devDependencies.PSObject.Properties.Name -contains "babel-preset-expo") {
    Write-Host "✅ babel-preset-expo: $($packageJson.devDependencies.'babel-preset-expo')" -ForegroundColor Green
} else {
    Write-Host "ℹ️ babel-preset-expo not in devDependencies (may be included with Expo)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 To start your app, run: npm start" -ForegroundColor Cyan
