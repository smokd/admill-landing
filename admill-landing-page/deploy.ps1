<#
Quick deploy script for Admill landing page

Examples:
  # Default usage (uses WGNinjaSrvKP.pem for ubuntu user)
  .\deploy.ps1

  # Use different identity file
  .\deploy.ps1 -IdentityFile "C:\\Users\\USER\\.ssh\\my-key.pem"

  # Skip build step (if you just built)
  .\deploy.ps1 -SkipBuild

  # Skip nginx reload
  .\deploy.ps1 -SkipReload

Params:
  -ServerHost    Target host or IP (default: ec2-13-244-223-7.af-south-1.compute.amazonaws.com)
  -UploadUser    SSH user for deployment (default: ubuntu)
  -RemotePath    Production directory for static files (default: /usr/share/nginx/html/)
  -TempPath      Temporary upload directory (default: /tmp/admill-out/)
  -LocalPath     Local output directory (Next export, default: out/)
  -IdentityFile  Path to private key (default: W:\Downloads\WGNinjaSrvKP.pem)
  -SkipBuild     Skip build step (useful for quick re-uploads)
  -SkipReload    Skip nginx reload step
#>

param(
    [string]$ServerHost = "ec2-13-244-223-7.af-south-1.compute.amazonaws.com",
    [string]$UploadUser = "ubuntu",
    [string]$RemotePath = "/usr/share/nginx/html/",
    [string]$TempPath = "/tmp/admill-out/",
    [string]$LocalPath = "out/",
    [string]$IdentityFile = "W:\Downloads\WGNinjaSrvKP.pem",
    [switch]$SkipBuild,
    [switch]$SkipReload
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Deploying Admill Landing Page..." -ForegroundColor Cyan

# Resolve server strings
$UploadServer = "$UploadUser@$ServerHost"

function Get-SshIdentityArgs {
    param([string]$Key)
    if ([string]::IsNullOrWhiteSpace($Key)) { return @() }
    # Normalize path and return parameter array for splatting
    $full = (Resolve-Path -Path $Key).Path
    return @('-i', $full)
}

# Step 1: Build
if (-not $SkipBuild) {
    Write-Host "`n📦 Building site..." -ForegroundColor Yellow
    $env:NODE_OPTIONS = "--max-old-space-size=2048"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build complete!" -ForegroundColor Green
} else {
    Write-Host "`n⏭️  Skipping build step (per -SkipBuild)" -ForegroundColor Yellow
}

# Ensure local path exists
if (-not (Test-Path -Path $LocalPath)) {
    Write-Host "❌ Local path '$LocalPath' not found. Did the build produce output?" -ForegroundColor Red
    exit 1
}

# Step 2: Upload to temporary directory
Write-Host "`n📤 Uploading to temporary directory ($UploadServer → $TempPath)..." -ForegroundColor Yellow

$sshArgs = Get-SshIdentityArgs -Key $IdentityFile

# Create temp directory on server
if ($sshArgs.Count -gt 0) {
    ssh @sshArgs $UploadServer "mkdir -p $TempPath"
} else {
    ssh $UploadServer "mkdir -p $TempPath"
}

# Upload files to temp directory
$scpArgs = @()
if ($sshArgs.Count -gt 0) { $scpArgs += $sshArgs }
$remoteTempTarget = "${UploadServer}:${TempPath}"

scp @scpArgs -r (Join-Path $LocalPath '*') $remoteTempTarget

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    if ($IdentityFile) {
        Write-Host "ℹ️  If you saw 'Permission denied (publickey)', ensure the key file is correct and has proper permissions." -ForegroundColor Yellow
    }
    exit 1
}

Write-Host "✅ Upload to temp directory complete!" -ForegroundColor Green

# Step 3: Move files to production directory with sudo
Write-Host "`n📦 Moving files to production directory ($RemotePath)..." -ForegroundColor Yellow
Write-Host "   (Excluding: matomo/ directory)" -ForegroundColor Gray

if ($sshArgs.Count -gt 0) {
    ssh @sshArgs $UploadServer "sudo rsync -av --delete --exclude='matomo' $TempPath $RemotePath"
} else {
    ssh $UploadServer "sudo rsync -av --delete --exclude='matomo' $TempPath $RemotePath"
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to move files to production directory!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files moved to production!" -ForegroundColor Green

# Step 4: Reload nginx
if (-not $SkipReload) {
    Write-Host "`n🔄 Reloading nginx..." -ForegroundColor Yellow
    if ($sshArgs.Count -gt 0) {
        ssh @sshArgs $UploadServer "sudo systemctl reload nginx"
    } else {
        ssh $UploadServer "sudo systemctl reload nginx"
    }

    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  nginx reload failed." -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ nginx reloaded!" -ForegroundColor Green
} else {
    Write-Host "`n⏭️  Skipping nginx reload (per -SkipReload)" -ForegroundColor Yellow
}

Write-Host "`n✨ Deployment successful!" -ForegroundColor Green
Write-Host "🌐 Visit: https://admill.co.zw" -ForegroundColor Cyan
