#!/bin/bash

# Environment script for Vercel deployment
# This file contains all environment variables needed for production

echo "Setting up environment variables for all TopCup apps..."

# MongoDB URI
export MONGODB_URI="mongodb+srv://gauravkumar495m122:njN8DGgdwwimSPdt@topcup.ugzk7vp.mongodb.net/topcup?retryWrites=true&w=majority&appName=TopCup"

# Email Configuration
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USER="gauravkumar495m122@gmail.com"
export SMTP_PASSWORD="xfzsgfctfwtkkprc"
export EMAIL_FROM="TopCup <noreply@topcup.com>"

# App URLs (update after deployment)
export NEXT_PUBLIC_APP_URL="https://top-ecfpxdbuu-gaurav620s-projects.vercel.app"
export NEXT_PUBLIC_ADMIN_URL="https://admin-panel-jgms1086v-gaurav620s-projects.vercel.app"
export NEXT_PUBLIC_DELIVERY_URL="https://delivery-dashboard-REPLACE-ME.vercel.app"

echo "✅ Environment variables configured"
