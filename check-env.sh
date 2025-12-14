#!/bin/bash

# TopCup Environment Configuration Checker
# This script verifies all required environment variables are set

echo "🔍 Checking TopCup Environment Configuration..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if variable exists in .env.local
check_var() {
    local file=$1
    local var_name=$2
    
    if [ -f "$file" ]; then
        if grep -q "^${var_name}=" "$file" 2>/dev/null; then
            local value=$(grep "^${var_name}=" "$file" | cut -d '=' -f2 | cut -d '#' -f1 | xargs)
            if [ ! -z "$value" ]; then
                echo -e "${GREEN}✅${NC} $var_name is set"
                return 0
            fi
        fi
    fi
    echo -e "${RED}❌${NC} $var_name is NOT set"
    return 1
}

# Check Customer App
echo "📱 Customer App (.env.local):"
CUSTOMER_ENV=".env.local"
check_var "$CUSTOMER_ENV" "MONGODB_URI"
check_var "$CUSTOMER_ENV" "NEXTAUTH_SECRET"
check_var "$CUSTOMER_ENV" "NEXTAUTH_URL"
echo "   Payment Mode:"
if check_var "$CUSTOMER_ENV" "PAYMENT_DEMO_MODE"; then
    echo -e "      ${YELLOW}ℹ️${NC}  Running in DEMO mode (no real payments)"
elif check_var "$CUSTOMER_ENV" "RAZORPAY_KEY_ID" && check_var "$CUSTOMER_ENV" "RAZORPAY_KEY_SECRET"; then
    echo -e "      ${GREEN}✅${NC} Razorpay configured for production"
else
    echo -e "      ${YELLOW}⚠️${NC}  No payment mode configured"
fi
echo ""

# Check Admin Panel
echo "👨‍💼 Admin Panel (.env.local):"
ADMIN_ENV="admin-panel/.env.local"
check_var "$ADMIN_ENV" "MONGODB_URI"
check_var "$ADMIN_ENV" "NEXTAUTH_SECRET"
check_var "$ADMIN_ENV" "NEXTAUTH_URL"
echo ""

# Check Delivery Dashboard
echo "🚚 Delivery Dashboard (.env.local):"
DELIVERY_ENV="delivery-dashboard/.env.local"
check_var "$DELIVERY_ENV" "MONGODB_URI"
check_var "$DELIVERY_ENV" "NEXTAUTH_SECRET"
echo ""

# Test MongoDB Connection
echo "🔗 Testing MongoDB Connection..."
if [ -f ".env.local" ]; then
    MONGO_URI=$(grep "^MONGODB_URI=" .env.local | cut -d '=' -f2 | xargs)
    if [ ! -z "$MONGO_URI" ]; then
        echo "   Testing connection to MongoDB..."
        # Try to connect using node
        node -e "const mongoose = require('mongoose'); mongoose.connect('$MONGO_URI').then(() => { console.log('✅ MongoDB connection successful'); process.exit(0); }).catch(err => { console.log('❌ MongoDB connection failed:', err.message); process.exit(1); });" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "   ${GREEN}✅${NC} MongoDB is accessible"
        else
            echo -e "   ${RED}❌${NC} Cannot connect to MongoDB"
            echo -e "   ${YELLOW}ℹ️${NC}  Check your connection string and network access"
        fi
    else
        echo -e "   ${YELLOW}⚠️${NC}  MONGODB_URI not found in .env.local"
    fi
else
    echo -e "   ${RED}❌${NC} .env.local file not found"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Summary:"
echo "   To fix missing variables, run:"
echo "   $ nano .env.local"
echo "   $ nano admin-panel/.env.local"  
echo "   $ nano delivery-dashboard/.env.local"
echo ""
echo "   Need a MongoDB Atlas setup guide?"
echo "   → https://www.mongodb.com/cloud/atlas/register"
echo ""
