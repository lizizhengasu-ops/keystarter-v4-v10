# Post-Fix Macro Analysis and Prevention Framework
## Date: 2026-07-12

## Part 1: Macro Problem Analysis

### Problem Category 1: Far-Distance Destruction
Symptoms: Modifying one component breaks an unrelated component
Examples: chatbot import crashed main site, nginx config overwrite
Root Cause: No cross-service dependency analysis before changes

### Problem Category 2: Scripting Language Friction
3+ shell layers (PowerShell -> SSH -> Bash -> Python/Node)
Each layer manipulates quoting, causing data corruption

### Problem Category 3: Incomplete API Design
Frontend UI built without verifying backend API exists
Token format mismatch between dashboard and server

### Problem Category 4: Missing Verification Gates
No pre-deploy checklist, service restart = fake verification


## Part 2: Prevention Framework (8 Rules)

1. ISOLATE: Create separate files for new functionality
2. PYTHON ONLY: Never PowerShell Set-Content for file writes
3. VERIFY: Run verify-deploy.sh after EVERY deployment
4. SEPARATE CONFIGS: Never put multiple server blocks in one nginx file
5. API CHECK: Verify backend API exists before building frontend UI
6. SAFE HTML: Always use escaped quotes in event handlers
7. BACKUP FIRST: Backup affected files before ANY edit
8. ONE CHANGE: Make and verify one change at a time


## Part 3: Keystarter Code Audit

App.tsx: NO chatbot code. Clean. Keep external injection.
api/woocommerce.ts: API_BASE hardcoded. Should be env config.
nginx: Separate files per service. Good pattern.
index.html: crossorigin preserved. Chatbot via script tag. Correct.

Recommendations:
1. Self-host all CDN resources (GFW-proof like Font Awesome fix)
2. Add React error boundary component
3. Make API endpoints configurable via env vars
4. Verify deploy.sh should become part of pre-push workflow


## Part 4: Pre-Edit Workflow

Before ANY modification:
1. IDENTIFY which services could be affected
2. BACKUP affected files locally
3. USE Python for all file writes
4. TEST existing workflow before changing
5. MAKE one change at a time
6. VERIFY each service still works
7. RUN verify-deploy.sh
8. CHECK service logs for errors

## Part 5: Key Commands

Deploy frontend: python pydeploy.py
Verify routes: ssh -i <key> bash /opt/scripts/verify-deploy.sh
Check logs: ssh -i <key> journalctl -u chatbot.service -n 20
Dashboard: https://keys-starter.com/admin/
