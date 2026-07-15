# Phase 1 Plan — ChatBot Core Service

Generated using planning-and-task-breakdown skill (agent-skills)

## Overview
Build and deploy the core ChatBot service: React ChatWidget + Node.js WebSocket backend + DeepSeek AI integration. 6 tasks, ~3-4 days Codex time.

## Task 1: ChatWidget.tsx (~200 lines, 4-6 hours)
React component: floating bubble, chat panel, WebSocket connection, HMAC token send. Zero external deps.

## Task 2: master.mjs (~150 lines, 3-4 hours)
WebSocket server: connection handling, tenant routing, message relay. Built on ws library.

## Task 3: auth.mjs (~80 lines, 2 hours)
HMAC-SHA256 token generation/validation. Domain whitelist. Rate limiting (IP + tenant).

## Task 4: worker.mjs (~150 lines, 3-4 hours)
Per-tenant message processing. KB directory access. Prompts assembly.

## Task 5: ai.mjs (~100 lines, 2-3 hours)
DeepSeek API integration. V8.3 system prompt injection. Intent classification. Response streaming.

## Task 6: Deploy (~2 hours)
Upload to VPS. nginx proxy config. systemd service. 10 test conversations.

## Key Decision
Single process + filesystem isolation (not child_process per tenant). 1GB VPS limitation.
