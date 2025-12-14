#!/bin/bash

# Auto-fix script for TopCup environment configuration
echo "🔧 Auto-fixing TopCup environment issues..."
echo ""

# Generate a secure NEXTAUTH_SECRET
SECRET=$(openssl rand -base64 32)

# Fix 1: Add NEXTAUTH_SECRET to delivery dashboard if missing
DELIVERY_ENV="delivery-dashboard/.env.local"
if [ -f "$DELIVERY_ENV" ]; then
    if ! grep -q "^NEXTAUTH_SECRET=" "$DELIVERY_ENV"; then
        echo "✅ Adding NEXTAUTH_SECRET to delivery dashboard..."
        echo "" >> "$DELIVERY_ENV"
        echo "# Authentication Secret (auto-generated)" >> "$DELIVERY_ENV"
        echo "NEXTAUTH_SECRET=$SECRET" >> "$DELIVERY_ENV"
        echo "   ✅ NEXTAUTH_SECRET added to $DELIVERY_ENV"
    else
        echo "   ℹ️  NEXTAUTH_SECRET already exists in delivery dashboard"
    fi
else
    echo "   ❌ $DELIVERY_ENV not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANT: MongoDB URI Fix Required"
echo ""
echo "I cannot automatically fix the MongoDB URI syntax error."
echo "You need to manually edit these files:"
echo ""
echo "1. .env.local"
echo "2. admin-panel/.env.local"
echo "3. delivery-dashboard/.env.local"
echo ""
echo "Change:"
echo "   ?retryWrites&w=majority"
echo "To:"
echo "   ?retryWrites=true&w=majority"
echo ""
echo "Run this helper command to see which files need updating:"
echo "   grep -l 'retryWrites&' .env.local admin-panel/.env.local delivery-dashboard/.env.local 2>/dev/null"
echo ""
echo "After fixing, restart all dev servers and run:"
echo "   bash check-env.sh"
echo ""
