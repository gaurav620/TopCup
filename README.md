# TopCup - Complete E-Commerce Ecosystem

A comprehensive e-commerce platform for cake and bakery products with integrated delivery management system.

## 🌟 Project Overview

TopCup is a full-stack e-commerce ecosystem consisting of three interconnected applications:

1. **Customer Application** (Port 3000) - Product browsing, cart, and checkout
2. **Admin Panel** (Port 5001) - Complete management dashboard
3. **Delivery Partner Dashboard** (Port 5002) - Delivery execution platform

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Customer App   │     │   Admin Panel   │     │ Delivery Dash   │
│   Port 3000     │     │   Port 5001     │     │   Port 5002     │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────┬───────┴───────────┬───────────┘
                         │                   │
                    ┌────▼───────────────────▼────┐
                    │    MongoDB Database         │
                    │  - Users                    │
                    │  - Products                 │
                    │  - Orders                   │
                    │  - DeliveryPartners         │
                    └─────────────────────────────┘
```

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

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
MongoDB >= 6.0
```

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/gaurav620/TopCup.git
cd TopCup
```

2. **Install MongoDB and start it:**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
```

3. **Install dependencies for all applications:**
```bash
# Customer App
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

4. **Configure environment variables:**

Create `.env.local` files in each directory:

**Root (Customer App) `.env.local`:**
```env
MONGODB_URI=mongodb://localhost:27017/topcup
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

**Admin Panel `.env.local`:**
```env
MONGODB_URI=mongodb://localhost:27017/topcup
NEXTAUTH_SECRET=admin-secret-key-here
NEXTAUTH_URL=http://localhost:5001
```

**Delivery Dashboard `.env.local`:**
```env
MONGODB_URI=mongodb://localhost:27017/topcup
NEXTAUTH_SECRET=delivery-secret-key-here
NEXTAUTH_URL=http://localhost:5002
```

5. **Start all applications:**

Open 3 terminal windows:

```bash
# Terminal 1 - Customer App
npm run dev
# Runs on http://localhost:3000

# Terminal 2 - Admin Panel
cd admin-panel
npm run dev
# Runs on http://localhost:5001

# Terminal 3 - Delivery Dashboard
cd delivery-dashboard
npm run dev
# Runs on http://localhost:5002
```

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

## 🎯 Getting Help

If you encounter issues:
1. Check MongoDB is running: `brew services list`
2. Verify all .env files are configured
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
4. Check port availability: `lsof -i :3000,:5001,:5002`

---

⭐ If you find this project helpful, please give it a star on GitHub!

**Happy Coding! 🚀**
