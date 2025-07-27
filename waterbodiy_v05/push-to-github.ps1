# Push to GitHub script
param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

Write-Host "🔗 Connecting to GitHub repository..." -ForegroundColor Cyan

# Add remote origin
git remote add origin $RepoUrl

# Set main branch
git branch -M main

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Your repository: $RepoUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Make sure the repository URL is correct and you have push access" -ForegroundColor Yellow
}
