# TopCup - Login Credentials (Development)

This document contains all the login credentials for the three TopCup applications in development mode.

---

## 🔐 Application Credentials

### 1. Admin Panel (http://localhost:5001)

**Login Credentials:**
```
Email: gauravkumar495m122@gmail.com
Password: gauravkumar495
```

**Features Access:**
- Dashboard with analytics
- Product management (CRUD)
- User management
- Order management
- Delivery partner management
- System settings

**Login Page:** `http://localhost:5001/signin` or root redirects to signin

---

### 2. Delivery Dashboard (http://localhost:5002)

**Login Credentials:**
```
Email: gauravkumar495m122@gmail.com
Password: gauravkumar495
```

**Features Access:**
- View assigned orders
- Update order status (picked up, in-transit, delivered)
- Track earnings and statistics
- View delivery history
- Profile management

**Login Page:** `http://localhost:5002` (root page)

**Partner Details:**
- Name: Test Delivery Partner
- Phone: +919876543210
- Vehicle: Bike (DL01AB1234)
- Working Area: Gurgaon
- Partner ID: DP1765794805088L10DLALUW

---

### 3. Customer App (http://localhost:3000)

**Development Mode (DEMO_MODE Enabled):**

```
Email: demo@topcup.in
Password: demo1234
```

> **IMPORTANT:** The customer app is currently running in **DEMO_MODE** which means it uses hardcoded credentials instead of database users.

**Features Access (Demo Mode):**
- Browse products
- Add to cart
- Place orders
- Track deliveries
- User profile (demo data)

---

## 🔄 How to Reset Passwords

### Reset Admin Password

```bash
cd TopCup
node scripts/seed-admin.js
```

### Reset Delivery Partner Password

```bash
cd TopCup
node scripts/seed-delivery-partner.js
```

---

## 🧪 Testing Login Flows

### Test Admin Panel Login

1. Start admin panel: `cd admin-panel && npm run dev`
2. Navigate to: `http://localhost:5001`
3. Enter credentials: `admin@topcup.com` / `admin123`
4. Should redirect to dashboard

### Test Delivery Dashboard Login

1. Start delivery dashboard: `cd delivery-dashboard && npm run dev`
2. Navigate to: `http://localhost:5002`
3. Enter credentials: `delivery@topcup.com` / `delivery123`
4. Should see delivery dashboard

### Test Customer App Login

1. Start customer app: `npm run dev` (from root)
2. Navigate to: `http://localhost:3000`
3. Click login/signin
4. Enter credentials: `demo@topcup.in` / `demo1234`
5. Should be logged in

---

## 🐛 Troubleshooting

### "Invalid credentials" error
1. Verify correct credentials for each app
2. Check MongoDB is running: `brew services list | grep mongodb`
3. Run appropriate seed script to reset password

### Login page not loading
1. Ensure dev server is running
2. Check port is not in use: `lsof -i :3000`
3. Restart the dev server

### Customer app won't accept credentials
1. Verify DEMO_MODE is enabled
2. Use demo credentials: `demo@topcup.in` / `demo1234`

---

**Last Updated:** December 15, 2025
