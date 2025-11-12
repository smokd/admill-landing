/**
 * PM2 Ecosystem Configuration for Admill Systems Website
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 logs admill-web
 *   pm2 restart admill-web
 *   pm2 stop admill-web
 */

module.exports = {
  apps: [
    {
      name: 'admill-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/admill-landing-page', // Update this to your actual path
      instances: 2, // Use 2 instances for load balancing (or 'max' for all CPU cores)
      exec_mode: 'cluster', // Cluster mode for better performance

      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Environment-specific configs (optional)
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
      },

      // Logging
      error_file: '/var/log/pm2/admill-web-error.log',
      out_file: '/var/log/pm2/admill-web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Auto-restart settings
      autorestart: true,
      watch: false, // Set to true in development if you want auto-reload
      max_memory_restart: '500M', // Restart if memory exceeds 500MB

      // Restart delay
      restart_delay: 4000, // Wait 4 seconds before restart

      // Process management
      kill_timeout: 5000, // Timeout before force kill (ms)
      listen_timeout: 3000, // Time to wait for app to be ready

      // Graceful shutdown
      wait_ready: true,

      // Advanced options
      min_uptime: 10000, // Min uptime before considering app stable (10s)
      max_restarts: 10, // Max restarts within min_uptime before stopping

      // Cron restart (optional - restart daily at 3 AM)
      // cron_restart: '0 3 * * *',

      // Post-deployment hooks (optional)
      // post_update: ['npm install', 'npm run build'],
    }
  ],

  // Deployment configuration (optional - for pm2 deploy)
  deploy: {
    production: {
      user: 'deploy', // SSH user
      host: 'admill.co.zw', // Server hostname/IP
      ref: 'origin/main', // Git branch
      repo: 'https://github.com/smokd/admill-landing.git', // Git repository
      path: '/var/www/admill-landing-page', // Deployment path
      'post-deploy': 'npm ci && npm run build && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
