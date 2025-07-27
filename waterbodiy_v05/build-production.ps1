# Build production AAB for Google Play Store

Write-Host "🏪 Building production AAB for Google Play Store..." -ForegroundColor Cyan

Write-Host ""
Write-Host "⚠️ IMPORTANT CHECKLIST:" -ForegroundColor Yellow
Write-Host "✓ Have you tested the preview APK thoroughly?" -ForegroundColor White
Write-Host "✓ Are all features working correctly?" -ForegroundColor White
Write-Host "✓ Have you created a Google Play Console account?" -ForegroundColor White
Write-Host "✓ Do you have app icons and screenshots ready?" -ForegroundColor White

$confirm = Read-Host "Continue with production build? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Production build cancelled" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔨 Building Android AAB for production..." -ForegroundColor Yellow
Write-Host "This will take 5-15 minutes..." -ForegroundColor Gray

eas build --platform android --profile production

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Production AAB build complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Download the AAB file from Expo dashboard" -ForegroundColor White
    Write-Host "2. Go to https://play.google.com/console" -ForegroundColor White
    Write-Host "3. Create a new app or upload to existing app" -ForegroundColor White
    Write-Host "4. Upload the AAB file in the 'Production' track" -ForegroundColor White
    Write-Host "5. Fill out store listing, content rating, etc." -ForegroundColor White
    Write-Host "6. Submit for review" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Expo Dashboard: https://expo.dev/mattdero/water-body-calculator" -ForegroundColor Blue
} else {
    Write-Host ""
    Write-Host "❌ Production build failed. Check the error messages above." -ForegroundColor Red
}
