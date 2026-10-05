#!/bin/bash
# TeleHealth Telemedicine MVP - Auto Startup Script
# This script automatically starts the dev server

cd "$(dirname "$0")/.." || exit 1

echo "🏥 Starting TeleHealth Telemedicine MVP..."
echo "📱 Server will be available at http://localhost:3000"
echo ""

npm run dev
