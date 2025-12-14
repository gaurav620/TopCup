#!/bin/bash

# MongoDB URI Syntax Fixer
# Fixes the retryWrites parameter syntax error in all .env files

echo "🔧 Fixing MongoDB URI syntax error..."
echo ""

# Function to fix MongoDB URI in a file
fix_mongo_uri() {
    local file=$1
    
    if [ ! -f "$file" ]; then
        echo "❌ File not found: $file"
        return 1
    fi
    
    # Check if file has the error
    if grep -q "retryWrites&" "$file" 2>/dev/null; then
        echo "🔄 Fixing $file..."
        
        # Create backup
        cp "$file" "$file.backup.$(date +%Y%m%d_%H%M%S)"
        
        # Fix the syntax error
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's/retryWrites&/retryWrites=true\&/g' "$file"
        else
            # Linux
            sed -i 's/retryWrites&/retryWrites=true\&/g' "$file"
        fi
        
        echo "   ✅ Fixed: retryWrites& → retryWrites=true&"
        return 0
    elif grep -q "retryWrites?" "$file" 2>/dev/null; then
        echo "🔄 Fixing $file..."
        
        # Create backup
        cp "$file" "$file.backup.$(date +%Y%m%d_%H%M%S)"
        
        # Fix the syntax error
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's/retryWrites?/retryWrites=true?/g' "$file"
        else
            # Linux
            sed -i 's/retryWrites?/retryWrites=true?/g' "$file"
        fi
        
        echo "   ✅ Fixed: retryWrites? → retryWrites=true?"
        return 0
    else
        echo "   ℹ️  $file - No syntax error found or already fixed"
        return 0
    fi
}

# Fix all three .env files
fix_mongo_uri ".env.local"
fix_mongo_uri "admin-panel/.env.local"
fix_mongo_uri "delivery-dashboard/.env.local"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ MongoDB URI syntax fix complete!"
echo ""
echo "Backups created with timestamp suffix (.backup.*)"
echo ""
echo "Next steps:"
echo "1. Restart all dev servers (Ctrl+C then npm run dev)"
echo "2. Run: bash check-env.sh"
echo ""
