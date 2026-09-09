# Admill Landing Page – Session Notes (2025-11-12)

These notes summarize what we did today to build and deploy the site, the issues we hit, and the next steps to complete deployment.

## Overview
- Goal: Build and deploy the Next.js landing page to AWS EC2.
- Result: Build succeeded; upload/reload blocked by SSH authentication (Permission denied: publickey).

## Actions taken
1. Fixed local build environment
   - Verified Node: v24.4.1; npm: 11.4.2
   - C: drive was full (0 GB free). Set npm cache to W: to proceed:
     - `npm config set cache "W:\\npm-cache"`
   - Installed deps: `npm install` (success)
   - Built site: `npm run build` (success). Static output in `out/`.

2. Improved deployment script (`deploy.ps1`)
   - Added parameters and better UX:
     - `-Host`, `-UploadUser`, `-ReloadUser`, `-RemotePath`, `-LocalPath`, `-IdentityFile`, `-SkipBuild`, `-SkipReload`
   - Identity file is used automatically for `scp`, `ssh`, and (if present) `rsync`.
   - Clearer failure messages and guidance.
   - Supports separate users for upload and nginx reload (e.g., `ftpuser` to upload, `ubuntu` to reload).

3. SSH setup attempts
   - Generated a new Ed25519 keypair locally:
     - Private: `C:\Users\USER\.ssh\id_ed25519`
     - Public: `C:\Users\USER\.ssh\id_ed25519.pub`
     - Public key contents:
       ```
       ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBae542Pn7AmEKI3QqCcJWYsQ50KeWygx8X3LPi1YCJG admill-deployment
       ```
   - Created SSH config for convenience:
     - `C:\Users\USER\.ssh\config`
       ```
       Host admill
           HostName ec2-13-244-223-7.af-south-1.compute.amazonaws.com
           User ftpuser
           IdentityFile ~/.ssh/id_ed25519
           StrictHostKeyChecking no
           UserKnownHostsFile ~/.ssh/known_hosts
       ```
   - Tried two existing `.pem` files from `W:\Downloads` (fixed permissions) → didn’t match this host.
   - Current blocker: Server doesn’t have the new public key for the target user(s).

## Current status
- Build: PASS (Next.js 15). Output in `out/`.
- Upload: FAIL due to SSH key missing on server for `ftpuser`.
- Reload: Not attempted (depends on SSH; recommend `ubuntu` user for reload).

## What to do next (server-side)
Perform these steps in AWS Console → EC2 → Instance → Connect (EC2 Instance Connect):

1) Add key for `ftpuser` (upload user)
```bash
sudo su - ftpuser
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBae542Pn7AmEKI3QqCcJWYsQ50KeWygx8X3LPi1YCJG admill-deployment' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
ls -la ~/.ssh && tail -n +1 ~/.ssh/authorized_keys
```

2) Optional: add the same key for `ubuntu` (nginx reload)
```bash
sudo su - ubuntu
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBae542Pn7AmEKI3QqCcJWYsQ50KeWygx8X3LPi1YCJG admill-deployment' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

3) Sanity checks (server)
```bash
# Where sshd reads keys from
sudo bash -lc 'sshd -T | grep -i authorizedkeysfile'
# Permissions and ownership
sudo ls -ld /home/ftpuser /home/ftpuser/.ssh /home/ftpuser/.ssh/authorized_keys
sudo chown -R ftpuser:ftpuser /home/ftpuser/.ssh
sudo chmod 700 /home/ftpuser/.ssh
sudo chmod 600 /home/ftpuser/.ssh/authorized_keys
# Logs (if still failing after a test)
sudo tail -n 100 /var/log/auth.log | grep -i ftpuser || sudo journalctl -u ssh -n 100 --no-pager
```

## How to deploy now (local)
- Upload only (no reload):
```powershell
pwsh
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
./deploy.ps1 -IdentityFile "C:\\Users\\USER\\.ssh\\id_ed25519" -SkipReload
```

- Upload as `ftpuser` and reload as `ubuntu`:
```powershell
./deploy.ps1 -IdentityFile "C:\\Users\\USER\\.ssh\\id_ed25519" -ReloadUser ubuntu
```

- Re-upload without rebuilding:
```powershell
./deploy.ps1 -IdentityFile "C:\\Users\\USER\\.ssh\\id_ed25519" -SkipBuild -ReloadUser ubuntu
```

Notes:
- `rsync` isn’t installed on Windows by default; script falls back to `scp`.
- Remote upload path (default): `/ftpuser/ftp/out/`
- Host (default): `ec2-13-244-223-7.af-south-1.compute.amazonaws.com`

## Alternative: GitHub Actions deployment
A workflow exists at `.github/workflows/deploy.yml` that builds and deploys as `ubuntu` and reloads nginx.
- Add repo secrets:
  - `AWS_HOST` = ec2-13-244-223-7.af-south-1.compute.amazonaws.com
  - `AWS_SSH_KEY` = contents of a private key that works for `ubuntu` on this server
- Ensure the matching public key is in `/home/ubuntu/.ssh/authorized_keys`.
- Push to `main` to trigger the deployment.

## Environment info
- Node: v24.4.1
- npm: 11.4.2
- npm cache relocated to: `W:\\npm-cache` (due to C: 0 GB free)
- Workspace: `admill-landing-page`

## Quality gates
- Build: PASS (Next.js build and export succeeded)
- Lint/Typecheck: Not run in this session
- Tests: N/A (no test suite in repo)

## Appendix: Updated script usage
- File: `deploy.ps1`
- Key parameters:
  - `-IdentityFile` – private key to use for ssh/scp (e.g., `C:\\Users\\USER\\.ssh\\id_ed25519`)
  - `-UploadUser` / `-ReloadUser` – separate users for upload/reload
  - `-SkipBuild` / `-SkipReload` – skip stages when desired
