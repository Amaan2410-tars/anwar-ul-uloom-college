# Anwar-ul-Uloom College Website

A modern, responsive college website built with React, Tailwind CSS, Node.js, and Express. This project includes a public website, student portal, and admin panel for managing college operations.

## 🚀 Features

### Public Website
- **Home Page**: Hero section, statistics, highlights, announcements, and call-to-action
- **About Page**: College history, mission, vision, core values, and timeline
- **Academics Page**: Complete course listings (UG, PG, Diploma programs)
- **Admissions Page**: Online application form with backend integration
- **Departments Page**: Department information with HOD and faculty details
- **Contact Page**: Contact form and embedded Google Maps

### Student Portal
- Student login system
- Profile dashboard
- Attendance tracking (dummy data)
- Results display
- Notices and announcements feed

### Admin Panel
- Secure admin login
- **Manage Students**: View, approve/reject student applications
- **Manage Departments**: Add, edit, delete departments
- **Manage Announcements**: Create, edit, delete announcements visible across the site

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **CORS** enabled for frontend-backend communication
- File-based JSON storage (no database required)
- RESTful API endpoints

## 📁 Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, Footer)
│   │   ├── pages/          # All page components
│   │   ├── App.jsx         # Main app component with routing
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles with Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── data/               # JSON data files (auto-generated)
│   ├── index.js            # Express server and API routes
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Students
- `POST /api/students/apply` - Submit admission application
- `GET /api/students` - Get all students (admin)
- `PUT /api/students/:id/approve` - Approve student
- `PUT /api/students/:id/reject` - Reject student

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department (admin)
- `PUT /api/departments/:id` - Update department (admin)
- `DELETE /api/departments/:id` - Delete department (admin)

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `POST /api/admin/login` - Admin login

### Health Check
- `GET /api/health` - Server status

## 🔐 Credentials

### Admin Panel
- **Username**: `admin@college.com`
- **Password**: `admin123`

### Student Portal
- Any email and password can be used for demo purposes

## 🎨 Design Features

- **Color Scheme**: Royal Blue (#0b4da2), White, Light Gray
- **Font**: Poppins (Google Fonts)
- **Animations**: Smooth Framer Motion transitions
- **Responsive**: Fully mobile and tablet friendly
- **Modern UI**: Clean, minimal design with professional look

## 🚀 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Output: `frontend/dist`

### Backend
The backend is ready for production deployment. Ensure environment variables are configured.

## 📦 Data Storage

The project uses file-based JSON storage in the `backend/data/` directory. Files are automatically created on first run:
- `announcements.json`
- `departments.json`
- `students.json`
- `contacts.json`

All data persists across server restarts.

## 🎯 Future Enhancements

- [ ] MongoDB integration for scalable data storage
- [ ] JWT-based authentication
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Certificate generation system
- [ ] File upload functionality
- [ ] Advanced search and filtering
- [ ] Multi-language support

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

### Adding New Pages
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/Navbar.jsx`

### Adding New API Endpoints
1. Add route in `backend/index.js`
2. Implement logic with readData/writeData helpers
3. Test with Postman or frontend

## 🐛 Troubleshooting

### Backend Issues
- Ensure port 5000 is not in use
- Check if dependencies are installed
- Verify JSON files in `backend/data/` directory

### Frontend Issues
- Clear browser cache
- Ensure backend is running
- Check API proxy configuration in `vite.config.js`

## 📞 Support

For issues or questions, please check the documentation or open an issue in the repository.

---

**Built with ❤️ for Anwar-ul-Uloom College**

