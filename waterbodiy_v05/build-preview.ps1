# Build preview APK for testing

Write-Host "📱 Building preview APK for testing..." -ForegroundColor Cyan

# Check if EAS CLI is installed
try {
    $easVersion = eas --version
    Write-Host "✅ EAS CLI version: $easVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ EAS CLI not found. Installing..." -ForegroundColor Red
    npm install -g @expo/eas-cli
}

Write-Host ""
Write-Host "🔨 Building Android APK..." -ForegroundColor Yellow
Write-Host "This will take 5-15 minutes..." -ForegroundColor Gray

eas build --platform android --profile preview

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ APK build complete!" -ForegroundColor Green
    Write-Host "📥 Download the APK from the Expo dashboard and test it" -ForegroundColor Cyan
    Write-Host "🌐 Expo Dashboard: https://expo.dev/mattdero/water-body-calculator" -ForegroundColor Blue
} else {
    Write-Host ""
    Write-Host "❌ Build failed. Check the error messages above." -ForegroundColor Red
}
