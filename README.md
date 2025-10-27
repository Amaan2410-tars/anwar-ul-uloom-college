# Anwar-ul-Uloom College - University Management System

A comprehensive, production-ready university website and backend management system featuring student portal, admin panel, payment integration, and certificate generation.

## 🚀 Features

### Frontend
- **Modern UI** with Next.js 14, React, and Tailwind CSS
- **Public Pages**: Home, About, Academics, Admissions, Departments, Research, Placements, Campus Life, Contact
- **Student Portal**: Login, Dashboard, Profile, Course Management
- **Admin Panel**: User Management, Course Management, Fee Management, Certificate Generation
- **Responsive Design** with mobile-first approach
- **Animations** using Framer Motion
- **Accessibility** features built-in

### Backend
- **RESTful API** with Express.js and MongoDB
- **JWT Authentication** with refresh tokens
- **Role-based Access Control** (Student, Faculty, Admin)
- **Razorpay Payment Integration** with webhook support
- **PDF Certificate Generation** using Puppeteer
- **File Upload** support with Multer
- **Rate Limiting & Security** features

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud)
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd anwar-ul-uloom-college
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
```

Configure your `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/anwarululoom
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or using MongoDB Atlas - update MONGODB_URI in .env
```

### 5. Seed Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@college.test` / `AdminPass123`
- Sample students, courses, departments

### 6. Run the Application

**Option 1: Docker (Recommended)**

```bash
# From root directory
docker-compose up -d

# View logs
docker-compose logs -f
```

**Option 2: Manual**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## 🌐 Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🔐 Default Credentials

After seeding:

- **Admin**
  - Email: `admin@college.test`
  - Password: `AdminPass123`

## 📁 Project Structure

```
anwar-ul-uloom-college/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # Reusable components
│   │   └── lib/              # Utilities
│   ├── public/               # Static files
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   └── utils/            # Helper functions
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Payments (Razorpay)
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Razorpay webhook handler
- `GET /api/payments/my-payments` - Get user payments

### Certificates
- `POST /api/certificates/generate` - Generate PDF certificate (Admin)
- `GET /api/certificates/:id/download` - Download certificate

## 🔧 Configuration

### Razorpay Setup

1. Create account at https://razorpay.com
2. Get test keys from Dashboard → Settings → API Keys
3. Update `.env` with your keys
4. Configure webhook URL: `http://your-domain.com/api/payments/webhook`
5. Copy webhook secret to `.env`

### Environment Variables

See `backend/.env.example` for all available variables.

## 🧪 Testing

```bash
cd backend
npm test
```

## 📦 Deployment

### Option 1: Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Manual Deployment

**Backend (Railway/Render/DigitalOcean)**:
- Set environment variables
- Use `npm start` for production

**Frontend (Vercel/Netlify)**:
- Connect GitHub repo
- Set `NEXT_PUBLIC_API_URL` environment variable
- Deploy

## 🗄️ Database Schema

Key Models:
- **User**: Users (students, faculty, admin)
- **Course**: Academic courses
- **Department**: Departments
- **Payment**: Transaction records
- **Certificate**: Generated certificates
- **Notice**: Public notices
- **Event**: College events

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Contact: info@anwarululoom.edu

## 🎓 Credits

Developed for Anwar-ul-Uloom College with modern web technologies.

---

**Note**: Remember to change default passwords and secrets in production!
