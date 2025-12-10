# TopCup Admin Panel

Separate administration dashboard for TopCup running on **port 5001**.

## 🚀 Quick Start

```bash
cd admin-panel
npm run dev
```

The admin panel will be available at: **http://localhost:5001**

## 📋 Features

- **User Management** - Create, edit, delete users and assign roles
- **Product Management** - Manage product inventory  
- **Order Management** - View and process customer orders
- **Dashboard Analytics** - View sales metrics and statistics
- **Secure Authentication** - Admin-only access with NextAuth

## 🔐 Access

Only users with `role: 'admin'` can access the admin panel.

### Make yourself an admin:

1. Visit: `http://localhost:3000/api/make-admin?email=YOUR_EMAIL`
2. Replace `YOUR_EMAIL` with your logged-in email
3. Log out and log back in
4. Access admin panel at `http://localhost:5001`

## 📁 Structure

- **Port 5001** - Admin Panel (this folder)
- **Port 3000** - Customer-facing website (parent folder)
- **Shared** - Models, utilities, and components via symlinks

## 🔗 Shared Resources

The admin panel shares these with the main app:
- `/src/lib` - Database connection, auth config
- `/src/models` - Mongoose models (User, Order, Product)
- `/src/components` - UI components

## 🛠️ Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MongoDB** - Database
- **NextAuth** - Authentication
- **Framer Motion** - Animations

## 📝 Environment Variables

Create `.env.local` with:

```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:5001
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## 🔒 Security Notes

- Admin panel is completely separate from customer site
- Only accessible to users with admin role
- All API routes protected with admin authentication
- Cannot delete your own admin account

## 📦 Available Scripts

- `npm run dev` - Start development server on port 5001
- `npm run build` - Build for production
- `npm run start` - Start production server on port 5001
- `npm run lint` - Run ESLint

---

**Made with ❤️ for TopCup**
