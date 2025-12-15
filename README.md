# TopCup - Complete E-Commerce Ecosystem

A comprehensive e-commerce platform for cake and bakery products with integrated delivery management system.

## 🎉 Recent Updates

### December 2025 - UI Enhancement & Database Integration
- ✨ **Framer Motion Animations**: Added smooth animations to ProductSlider with hover effects, pulse badges, and interactive elements
- 🔗 **Database-Connected Slider**: ProductSlider now fetches products dynamically from database via API
- 🎨 **Enhanced UI**: Quick action buttons (cart/wishlist), shimmer loading effects, and improved hover interactions
- 📦 **Package Updates**: Updated to ESLint v9 and latest eslint-config-next
- 🔧 **Admin Panel Fix**: Fixed model import symlinks, resolved TypeScript errors

---

## 🌟 Project Overview

TopCup is a full-stack e-commerce ecosystem consisting of three interconnected applications:

1. **Customer Application** (Port 3000) - Product browsing, cart, and checkout
2. **Admin Panel** (Port 5001) - Complete management dashboard
3. **Delivery Partner Dashboard** (Port 5002) - Delivery execution platform

## 🏗️ Project Architecture

TopCup consists of three independent Next.js applications sharing a single MongoDB database.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        TopCup E-Commerce Platform                   │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Customer App    │    │  Admin Panel     │    │ Delivery Dash    │
│  Port: 3000      │    │  Port: 5001      │    │  Port: 5002      │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ • Browse Products│    │ • Manage Products│    │ • View Assigned  │
│ • Add to Cart    │    │ • Manage Users   │    │   Orders         │
│ • Place Orders   │    │ • Manage Orders  │    │ • Update Status  │
│ • Track Delivery │    │ • Assign Delivery│    │ • Track Earnings │
│ • User Auth      │    │ • Analytics      │    │ • View History   │
└────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘
         │                       │                       │
         │   ┌───────────────────┴───────────────────┐   │
         │   │                                       │   │
         └───┼──────────► API Routes ◄──────────────┼───┘
             │                                       │
             └───────────────┬───────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  MongoDB Atlas    │
                    │  or Local MongoDB │
                    ├───────────────────┤
                    │ Collections:      │
                    │ • users           │
                    │ • products        │
                    │ • orders          │
                    │ • deliverypartners│
                    │ • admins          │
                    └───────────────────┘

Data Flow:
1. Customer places order → Stored in MongoDB
2. Admin assigns order to delivery partner → Order updated
3. Delivery partner updates status → Customer sees real-time updates
4. All apps share same database for consistency
```

### Technology Stack per Application

| Component | Customer App | Admin Panel | Delivery Dashboard |
|-----------|--------------|-------------|-------------------|
| **Framework** | Next.js 14 | Next.js 14 | Next.js 14 |
| **Styling** | Tailwind CSS | Tailwind CSS | Tailwind CSS |
| **State** | Zustand | Zustand | React Hooks |
| **Database** | MongoDB (Mongoose) | MongoDB (Mongoose) | MongoDB (Mongoose) |
| **Auth** | NextAuth.js | Custom Auth | Custom Auth |
| **Animations** | Framer Motion | Framer Motion | - |

## 📦 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **Next.js API Routes** - Backend endpoints

## 🚀 Getting Started - Quick Setup Guide

Follow these steps to get all three applications running on your local machine.

### Prerequisites

Ensure you have the following installed:

```bash
# Check versions
node --version   # Should be >= 18.0.0
npm --version    # Should be >= 9.0.0
```

### Step 1: Clone Repository

```bash
git clone https://github.com/gaurav620/TopCup.git
cd TopCup
```

### Step 2: Setup MongoDB

Choose one of the following options:

**Option A: Local MongoDB (Recommended for Development)**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0

# Verify MongoDB is running
brew services list | grep mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/topcup`)

### Step 3: Install Dependencies

Install dependencies for all three applications:

```bash
# Customer App (root directory)
npm install

# Admin Panel
cd admin-panel
npm install
cd ..

# Delivery Dashboard
cd delivery-dashboard
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create `.env.local` files in each directory:

**Root Directory `.env.local` (Customer App):**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/topcup

# Authentication
NEXTAUTH_SECRET=your-random-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Optional: Cloudinary for image uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

**`admin-panel/.env.local` (Admin Panel):**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/topcup

# Authentication
NEXTAUTH_SECRET=admin-panel-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:5001
```

**`delivery-dashboard/.env.local` (Delivery Dashboard):**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/topcup

# Authentication
NEXTAUTH_SECRET=delivery-dashboard-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:5002
```

> [!TIP]
> Generate secure secrets using: `openssl rand -base64 32`

### Step 5: Verify Database Connection

Test that MongoDB is accessible:

```bash
# If using local MongoDB, connect to verify
mongosh
# You should see: "Connected to: mongodb://127.0.0.1:27017"
# Type 'exit' to quit

# Or check if process is running
ps aux | grep mongod
```

### Step 6: Start All Applications

Open **three separate terminal windows** and run each application:

**Terminal 1 - Customer App:**
```bash
cd TopCup
npm run dev
# ✓ Ready on http://localhost:3000
```

**Terminal 2 - Admin Panel:**
```bash
cd TopCup/admin-panel
npm run dev
# ✓ Ready on http://localhost:5001
```

**Terminal 3 - Delivery Dashboard:**
```bash
cd TopCup/delivery-dashboard
npm run dev
# ✓ Ready on http://localhost:5002
```

### Step 7: Access Applications

Open your browser and navigate to:

- **Customer App:** [http://localhost:3000](http://localhost:3000)
- **Admin Panel:** [http://localhost:5001](http://localhost:5001)
- **Delivery Dashboard:** [http://localhost:5002](http://localhost:5002)

## 📱 Application URLs

- **Customer App:** http://localhost:3000
- **Admin Panel:** http://localhost:5001
- **Delivery Dashboard:** http://localhost:5002

## 🔑 Default Login Credentials

### Admin Panel
- Email: `admin`
- Password: `admin123`

### Delivery Partner Dashboard
- First, create a delivery partner via Admin Panel
- Then use those credentials to login

## 📚 Features

### Customer Application (Port 3000)

- 🏠 **Home Page** - Hero section with featured products
- 🎂 **Product Catalog** - Browse cakes, combos, gifts
- 🛒 **Shopping Cart** - Add to cart with quantity management
- ❤️ **Wishlist** - Save favorite products
- 💳 **Checkout** - Complete order placement
- 👤 **User Authentication** - Sign up and login

### Admin Panel (Port 5001)

- 📊 **Dashboard** - Overview with key metrics
- 👥 **User Management** - View and manage customers
- 📦 **Product Management** - CRUD operations for products
- 🛍️ **Order Management** - Process and track all orders
- 🚴 **Delivery Partners** - Manage delivery team
- 📈 **Analytics** - Sales and performance insights

### Delivery Dashboard (Port 5002)

- 🏍️ **Active Orders** - View assigned deliveries
- ✅ **Order Status** - Update pickup/delivery status
- 📜 **Delivery History** - Completed deliveries
- 📊 **Performance Stats** - Earnings and ratings
- 👤 **Profile** - Update personal information

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (customer/admin),
  addresses: Array
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number
}
```

### Order
```javascript
{
  orderId: String (unique),
  customer: Object,
  items: Array,
  totalAmount: Number,
  deliveryAddress: Object,
  status: String,
  deliveryPartner: ObjectId (ref),
  deliveryStatus: String,
  paymentMethod: String,
  timestamps
}
```

### DeliveryPartner
```javascript
{
  partnerId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  vehicleType: String,
  vehicleNumber: String,
  status: String,
  totalDeliveries: Number,
  totalEarnings: Number,
  rating: Number
}
```

## 🔄 Complete Workflow

1. **Customer places order** → Order created in database
2. **Admin assigns to delivery partner** → Order status: "assigned"
3. **Partner receives notification** → Views in dashboard
4. **Partner picks up order** → Status: "picked-up"
5. **Partner delivers** → Status: "delivered", earnings updated
6. **Customer sees delivery status** → Order complete

## 📁 Project Structure

```
TopCup/
├── app/                      # Customer app pages
├── src/
│   ├── components/          # Reusable UI components
│   └── store/              # Zustand state management
├── models/                  # MongoDB models
├── lib/                     # Database utilities
├── admin-panel/
│   └── src/
│       └── app/            # Admin pages & API routes
├── delivery-dashboard/
│   └── app/                # Delivery dashboard pages
├── public/                 # Static assets
└── README.md
```

## 🛠️ API Endpoints

### Customer App APIs
- `GET /api/products` - Fetch all products
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Admin Panel APIs
- `GET /api/delivery-partners` - List all partners
- `POST /api/delivery-partners` - Create partner
- `PUT /api/orders/:id/assign` - Assign order

### Delivery Dashboard APIs
- `POST /api/auth/login` - Partner login
- `GET /api/delivery/orders` - Get assigned orders
- `PUT /api/delivery/orders/:id/status` - Update status

## 🧪 Testing

### Test Complete Workflow

1. **Create Delivery Partner:**
```bash
# Go to http://localhost:5001
# Login with admin/admin123
# Navigate to Delivery Partners → Add New Partner
```

2. **Create Test Order:**
```bash
# Use MongoDB Compass or create via customer app
```

3. **Assign Order:**
```bash
# Admin Panel → Orders → Assign to Partner
```

4. **Update Status:**
```bash
# Delivery Dashboard → Login → Update order status
```

## 🎨 Design Features

- **Modern UI** - Clean, professional design
- **Responsive** - Mobile-first approach
- **Animations** - Smooth transitions with Framer Motion
- **Consistent** - Unified design system across all apps
- **Accessible** - WCAG compliant

## 🔒 Security

- Password hashing with bcryptjs
- Environment variables for sensitive data
- Input validation on all forms
- Protected API routes
- Secure authentication flow

## 🚧 Future Enhancements

- [ ] Real-time notifications (Socket.io)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] GPS tracking for delivery
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Multi-language support
- [ ] Dark mode

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Gaurav Kumar Mehta**
- GitHub: [@gaurav620](https://github.com/gaurav620)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- Vercel for hosting capabilities
- Open source community

## 📞 Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact: gauravkumarmehta06@gmail.com

## 🎯 Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB if not running
brew services start mongodb-community@6.0

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart MongoDB
brew services restart mongodb-community@6.0
```

#### Issue 2: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Find process using the port
lsof -i :3000
lsof -i :5001
lsof -i :5002

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use different ports by editing package.json scripts
```

#### Issue 3: Environment Variables Not Loading

**Problem:** Application can't connect to database or shows undefined values

**Solutions:**
1. Ensure `.env.local` files are in the correct directories:
   - `TopCup/.env.local` (Customer App)
   - `TopCup/admin-panel/.env.local` (Admin Panel)
   - `TopCup/delivery-dashboard/.env.local` (Delivery Dashboard)

2. Restart the dev server after creating/modifying `.env.local`

3. Check file is not named `.env.local.txt` or similar

4. Verify no syntax errors in `.env.local` (no spaces around `=`)

#### Issue 4: Module Not Found Errors

**Error:** `Module not found: Can't resolve 'xyz'`

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For admin panel
cd admin-panel
rm -rf node_modules package-lock.json
npm install
cd ..

# For delivery dashboard
cd delivery-dashboard
rm -rf node_modules package-lock.json
npm install
cd ..

# Clear Next.js cache
rm -rf .next
cd admin-panel && rm -rf .next && cd ..
cd delivery-dashboard && rm -rf .next && cd ..
```

#### Issue 5: Build Errors

**Error:** TypeScript or ESLint errors during build

**Solutions:**
```bash
# Run build to see exact errors
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Fix common issues
# - Missing dependencies: npm install
# - Outdated packages: npm update
# - Cache issues: rm -rf .next && npm run dev
```

#### Issue 6: Database Shows Empty Data

**Problem:** Admin panel or apps show no data

**Solutions:**
1. Verify MongoDB connection string is correct
2. Check if data exists:
   ```bash
   mongosh
   use topcup
   db.products.count()
   db.users.count()
   db.orders.count()
   exit
   ```

3. Seed initial data via admin panel or MongoDB Compass

#### Issue 7: Admin Login Not Working

**Problem:** Can't login with default credentials

**Solutions:**
1. Default credentials (for development):
   - Email: `admin`
   - Password: `admin123`

2. If still failing, check console for errors

3. Verify `NEXTAUTH_SECRET` is set in `admin-panel/.env.local`

4. Clear browser cookies and localStorage

#### Quick Health Check Commands

```bash
# Check all required services
node --version        # Should be >= 18
npm --version         # Should be >= 9
mongosh --version     # MongoDB shell
brew services list    # Check MongoDB status

# Test database connection
mongosh mongodb://localhost:27017/topcup --eval "db.stats()"

# Check if apps are running
curl http://localhost:3000      # Customer App
curl http://localhost:5001      # Admin Panel  
curl http://localhost:5002      # Delivery Dashboard
```

### Getting Additional Help

If you encounter issues not covered here:

1. **Check Logs:** Look at terminal output for error messages
2. **GitHub Issues:** [Create an issue](https://github.com/gaurav620/TopCup/issues) with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, MongoDB version)
3. **Contact:** gauravkumarmehta06@gmail.com

---

⭐ If you find this project helpful, please give it a star on GitHub!

**Happy Coding! 🚀**
