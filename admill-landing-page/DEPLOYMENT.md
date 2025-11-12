# 🚀 Admill Systems - Production Deployment Guide

This guide covers deploying your Next.js landing page to a production server with Node.js, Nginx, and PM2.

---

## 📋 Prerequisites

### Server Requirements
- **OS:** Ubuntu 20.04+ or similar Linux distribution
- **Node.js:** v18.17+ or v20.x (LTS recommended)
- **npm:** v9+
- **Nginx:** Latest stable version
- **PM2:** Process manager for Node.js (optional but recommended)
- **Domain:** admill.co.zw with DNS pointing to your server

### Local Requirements
- Git installed
- SSH access to your server
- SMTP credentials for email functionality

---

## 🔧 Server Setup

### 1. Install Node.js (if not already installed)

```bash
# Using NodeSource repository for latest LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Setup PM2 to start on system boot
pm2 startup systemd
# Follow the command output instructions
```

---

## 📦 Application Deployment

### Option A: Deploy via Git (Recommended)

```bash
# 1. SSH into your server
ssh user@admill.co.zw

# 2. Navigate to web directory
cd /var/www

# 3. Clone the repository
sudo git clone https://github.com/smokd/admill-landing.git
cd admill-landing/admill-landing-page

# 4. Install dependencies
npm ci --production=false

# 5. Create environment file
sudo nano .env.local
```

Add your SMTP configuration to `.env.local`:
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@admill.co.zw
SMTP_PASS=your-secure-password
```

```bash
# 6. Build the application
npm run build

# 7. Test that it works
npm start
# Visit http://your-server-ip:3000 to verify
# Press Ctrl+C to stop
```

### Option B: Deploy via FTP/SFTP

```bash
# 1. On your local machine, create a production build
npm run build

# 2. Upload the entire project folder to your server
# Use FileZilla, WinSCP, or rsync:
rsync -avz --exclude 'node_modules' \
  /path/to/admill-landing-page/ \
  user@admill.co.zw:/var/www/admill-landing-page/

# 3. SSH into server and install dependencies
ssh user@admill.co.zw
cd /var/www/admill-landing-page
npm ci --production=false
```

---

## 🔄 PM2 Process Management

### Using PM2 Ecosystem File

The project includes `ecosystem.config.js` for PM2. Start your app:

```bash
cd /var/w/admill-landing-page

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Useful PM2 commands:
pm2 status              # Check app status
pm2 logs admill-web     # View logs
pm2 restart admill-web  # Restart app
pm2 stop admill-web     # Stop app
pm2 delete admill-web   # Remove from PM2
```

### Manual PM2 Start (if ecosystem file not used)

```bash
pm2 start npm --name "admill-web" -- start
pm2 save
```

---

## 🌐 Nginx Configuration

### Create Nginx Server Block

```bash
sudo nano /etc/nginx/sites-available/admill.co.zw
```

Paste the configuration from `nginx.conf` (included in project), or use this:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name admill.co.zw www.admill.co.zw;

    # Redirect HTTP to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Enable the site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/admill.co.zw /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate (HTTPS)

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Obtain SSL Certificate

```bash
sudo certbot --nginx -d admill.co.zw -d www.admill.co.zw

# Follow the prompts
# Certbot will automatically configure Nginx for HTTPS
```

### Auto-renewal Test

```bash
sudo certbot renew --dry-run
```

SSL certificates auto-renew via cron/systemd timer.

---

## 🔄 Deployment Updates

### Update Application (Git Method)

```bash
cd /var/www/admill-landing-page

# Pull latest changes
git pull origin main

# Install any new dependencies
npm ci

# Rebuild
npm run build

# Restart with PM2
pm2 restart admill-web

# Or reload for zero-downtime
pm2 reload admill-web
```

### Update Application (Manual Upload)

```bash
# 1. Build locally
npm run build

# 2. Upload to server (excluding node_modules)
rsync -avz --exclude 'node_modules' \
  /local/path/ user@admill.co.zw:/var/www/admill-landing-page/

# 3. SSH and restart
ssh user@admill.co.zw
cd /var/www/admill-landing-page
npm ci
pm2 restart admill-web
```

---

## 🐛 Troubleshooting

### Check Application Logs

```bash
# PM2 logs
pm2 logs admill-web

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Test SMTP Configuration

```bash
# Check environment variables are loaded
pm2 env admill-web | grep SMTP
```

### Port Already in Use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process if needed
sudo kill -9 <PID>
```

### Nginx Won't Start

```bash
# Check configuration
sudo nginx -t

# Check for port conflicts
sudo netstat -tulpn | grep :80
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring dashboard
pm2 monit

# Web-based monitoring (optional)
pm2 plus
```

### Check Application Health

```bash
curl http://localhost:3000
curl https://admill.co.zw
```

---

## 🔐 Security Checklist

- [ ] Firewall configured (UFW or iptables)
- [ ] SSH key-based authentication enabled
- [ ] Root login disabled
- [ ] SSL certificate installed and auto-renewing
- [ ] Environment variables secured (not in git)
- [ ] Regular system updates scheduled
- [ ] Fail2ban installed (optional)
- [ ] Database credentials rotated (if applicable)

---

## 🚨 Emergency Rollback

```bash
# If deployment fails, rollback to previous version
git log --oneline  # Find previous commit hash
git checkout <previous-commit-hash>
npm ci
npm run build
pm2 restart admill-web
```

---

## 📞 Support

- **Email:** info@admill.co.zw
- **Repository:** https://github.com/smokd/admill-landing
- **Next.js Docs:** https://nextjs.org/docs

---

## 📝 Quick Reference Commands

```bash
# Server status
pm2 status
sudo systemctl status nginx

# View logs
pm2 logs
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart admill-web
sudo systemctl restart nginx

# Update application
git pull && npm ci && npm run build && pm2 restart admill-web
```

---

**Last Updated:** November 2025
**Next.js Version:** 15.4.4
**Node.js Version:** 20.x LTS
