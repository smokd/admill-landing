# Quick Deploy Script for Admill Landing Page

## Prerequisites
- Node.js 20+ installed
- SSH access to AWS server
- Git repository synced

## Manual Deploy

### 1. Build locally
```powershell
cd w:\Documents\ADMILL\Github\admill-landing\admill-landing-page
$env:NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

### 2. Upload to server

**Option A: SCP (Command Line)**
```powershell
# Upload static files
scp -r out/* ubuntu@YOUR_AWS_IP:/var/www/admill.co.zw/

# Or compress first (faster)
tar czf deploy.tar.gz -C out .
scp deploy.tar.gz ubuntu@YOUR_AWS_IP:/tmp/
ssh ubuntu@YOUR_AWS_IP "cd /var/www/admill.co.zw && tar xzf /tmp/deploy.tar.gz && rm /tmp/deploy.tar.gz"
```

**Option B: rsync (Faster, only syncs changes)**
```powershell
# Install rsync on Windows (via WSL or Cygwin)
rsync -avz --delete out/ ubuntu@YOUR_AWS_IP:/var/www/admill.co.zw/
```

**Option C: WinSCP/FileZilla (GUI)**
1. Open WinSCP/FileZilla
2. Connect to AWS server
3. Navigate to `/var/www/admill.co.zw/`
4. Upload `out/*` contents (overwrite all)

### 3. Reload nginx (optional)
```bash
ssh ubuntu@YOUR_AWS_IP "sudo systemctl reload nginx"
```

---

## Automated Deploy (GitHub Actions)

### Setup (One-time)

1. **Add SSH key to GitHub Secrets:**
   ```powershell
   # On your local machine, copy your AWS private key
   cat ~/.ssh/id_rsa  # or wherever your key is
   ```

2. **In GitHub repo → Settings → Secrets → Actions:**
   - Add `AWS_SSH_KEY` = your private key content
   - Add `AWS_HOST` = your server IP or domain

3. **Push the workflow file** (already created in `.github/workflows/deploy.yml`)

### Usage
```powershell
# Just push to main branch
git add .
git commit -m "Deploy changes"
git push origin main

# GitHub Actions will automatically:
# 1. Build the site
# 2. Upload to your server
# 3. Reload nginx
```

---

## Alternative: Build on Server (No upload needed)

**Pros:** No file transfer, faster for small changes
**Cons:** Requires Node.js on server

```bash
# SSH into server
ssh ubuntu@YOUR_AWS_IP

# Navigate to project (clone once)
cd /var/www/
git clone https://github.com/smokd/admill-landing.git build-temp
cd build-temp/admill-landing-page

# Install dependencies (first time only)
npm ci

# Build
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

# Move to production
sudo rsync -av --delete out/ /var/www/admill.co.zw/

# Reload nginx
sudo systemctl reload nginx
```

**Automate with a deploy script on server:**
```bash
#!/bin/bash
# /home/ubuntu/deploy-landing.sh

cd /var/www/build-temp/admill-landing-page
git pull origin main
npm ci --production=false
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
sudo rsync -av --delete out/ /var/www/admill.co.zw/
sudo systemctl reload nginx
echo "✅ Deployment complete!"
```

Then just run:
```bash
ssh ubuntu@YOUR_AWS_IP 'bash /home/ubuntu/deploy-landing.sh'
```

---

## Recommended Workflow

**For Development:**
- Use manual deploy with rsync (fast, only syncs changes)

**For Production:**
- Use GitHub Actions (automated, versioned, rollback-friendly)

**Quick Fix Flow:**
1. Edit code locally
2. `$env:NODE_OPTIONS="--max-old-space-size=2048" ; npm run build`
3. `rsync -avz --delete out/ ubuntu@YOUR_AWS_IP:/var/www/admill.co.zw/`
4. Done in ~30 seconds

**Enterprise Flow:**
1. Edit code
2. `git commit && git push`
3. GitHub Actions deploys automatically
4. Monitor deploy in Actions tab
