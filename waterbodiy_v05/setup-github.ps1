# GitHub Setup Script for Water Body Calculator

Write-Host "🚀 Setting up GitHub repository..." -ForegroundColor Cyan

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git version: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first from https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Initialize git repository
Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "📦 Adding files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Water Body Calculator App

Features:
- Rain Catchment Calculator
- Cistern Sizing Calculator  
- Tank Capacity Calculator
- Water Pressure Calculator
- Embankment Calculator
- Slope Calculator
- Soil Type Calculator
- Acre-Feet Calculator"

Write-Host ""
Write-Host "✅ Local Git repository created!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor White
Write-Host "2. Name it 'water-body-calculator' or similar" -ForegroundColor White
Write-Host "3. Don't initialize with README (we already have one)" -ForegroundColor White
Write-Host "4. Copy the remote URL and run:" -ForegroundColor White
Write-Host "   git remote add origin <your-repo-url>" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Or run: .\push-to-github.ps1 <your-repo-url>" -ForegroundColor Cyan
