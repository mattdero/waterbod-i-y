# Complete deployment script for Google Play Store

Write-Host "🚀 Water Body Calculator - Google Play Store Deployment" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# Step 1: Install EAS CLI
Write-Host ""
Write-Host "📦 Step 1: Installing EAS CLI..." -ForegroundColor Yellow
npm install -g @expo/eas-cli

# Step 2: Login to Expo
Write-Host ""
Write-Host "🔐 Step 2: Login to Expo..." -ForegroundColor Yellow
Write-Host "You'll need to create an account at https://expo.dev if you don't have one" -ForegroundColor Gray
eas login

# Step 3: Configure project
Write-Host ""
Write-Host "⚙️ Step 3: Configuring project..." -ForegroundColor Yellow
eas build:configure

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: eas build --platform android --profile preview" -ForegroundColor White
Write-Host "   (This creates an APK for testing)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Test your APK thoroughly" -ForegroundColor White
Write-Host ""
Write-Host "3. When ready for Play Store:" -ForegroundColor White
Write-Host "   eas build --platform android --profile production" -ForegroundColor Gray
Write-Host "   (This creates an AAB file for Google Play)" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Upload the AAB to Google Play Console" -ForegroundColor White
Write-Host ""
Write-Host "📱 For quick testing, run: .\build-preview.ps1" -ForegroundColor Cyan
