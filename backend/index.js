const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper function to read/write JSON files
const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeData = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Initialize default data if files don't exist
const initializeData = () => {
  const announcements = readData('announcements.json');
  const departments = readData('departments.json');
  const students = readData('students.json');
  const contacts = readData('contacts.json');

  if (announcements.length === 0) {
    writeData('announcements.json', [
      {
        id: 1,
        title: 'Welcome to New Academic Year 2024-25',
        description: 'We are excited to welcome all students for the new academic session. Classes will begin on August 1st, 2024.',
        date: '2024-07-15',
        type: 'general'
      },
      {
        id: 2,
        title: 'Admission Open for PG Courses',
        description: 'Admissions are now open for various postgraduate programs. Apply before July 30th.',
        date: '2024-07-10',
        type: 'admission'
      }
    ]);
  }

  if (departments.length === 0) {
    writeData('departments.json', [
      {
        id: 1,
        name: 'Computer Science',
        description: 'Department of Computer Science offers cutting-edge courses in programming, AI, and data science.',
        hod: 'Dr. Ahmed Khan',
        faculty: ['Dr. Ahmed Khan', 'Prof. Sarah Ali', 'Prof. Asif Hasan', 'Prof. Maryam Zain']
      },
      {
        id: 2,
        name: 'Commerce',
        description: 'Our Commerce department prepares students for careers in business, finance, and accounting.',
        hod: 'Dr. Usman Sheikh',
        faculty: ['Dr. Usman Sheikh', 'Prof. Fatima Ahmed', 'Prof. Imran Raza']
      },
      {
        id: 3,
        name: 'Arts',
        description: 'The Arts department offers a wide range of humanities and social science programs.',
        hod: 'Dr. Neha Verma',
        faculty: ['Dr. Neha Verma', 'Prof. Amit Kumar', 'Prof. Priya Singh']
      },
      {
        id: 4,
        name: 'Science',
        description: 'Science department provides comprehensive education in Physics, Chemistry, and Mathematics.',
        hod: 'Dr. Mohd. Rahman',
        faculty: ['Dr. Mohd. Rahman', 'Prof. Geeta Sharma', 'Prof. Rajesh Patel']
      }
    ]);
  }

  if (students.length === 0) {
    writeData('students.json', []);
  }

  if (contacts.length === 0) {
    writeData('contacts.json', []);
  }
};

// Routes
// ====== STUDENT ROUTES ======
app.post('/api/students/apply', (req, res) => {
  try {
    const students = readData('students.json');
    const newStudent = {
      id: students.length + 1,
      ...req.body,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    students.push(newStudent);
    writeData('students.json', students);
    res.status(201).json({ message: 'Application submitted successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

app.get('/api/students', (req, res) => {
  try {
    const students = readData('students.json');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.put('/api/students/:id/approve', (req, res) => {
  try {
    const students = readData('students.json');
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index].status = 'approved';
      writeData('students.json', students);
      res.json({ message: 'Student approved', student: students[index] });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve student' });
  }
});

app.put('/api/students/:id/reject', (req, res) => {
  try {
    const students = readData('students.json');
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index].status = 'rejected';
      writeData('students.json', students);
      res.json({ message: 'Student rejected', student: students[index] });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject student' });
  }
});

// ====== DEPARTMENT ROUTES ======
app.get('/api/departments', (req, res) => {
  try {
    const departments = readData('departments.json');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

app.post('/api/departments', (req, res) => {
  try {
    const departments = readData('departments.json');
    const newDepartment = {
      id: departments.length + 1,
      ...req.body,
      faculty: req.body.faculty || []
    };
    departments.push(newDepartment);
    writeData('departments.json', departments);
    res.status(201).json({ message: 'Department created', department: newDepartment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create department' });
  }
});

app.put('/api/departments/:id', (req, res) => {
  try {
    const departments = readData('departments.json');
    const id = parseInt(req.params.id);
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
      departments[index] = { ...departments[index], ...req.body };
      writeData('departments.json', departments);
      res.json({ message: 'Department updated', department: departments[index] });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department' });
  }
});

app.delete('/api/departments/:id', (req, res) => {
  try {
    const departments = readData('departments.json');
    const id = parseInt(req.params.id);
    const filtered = departments.filter(d => d.id !== id);
    writeData('departments.json', filtered);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

// ====== ANNOUNCEMENT ROUTES ======
app.get('/api/announcements', (req, res) => {
  try {
    const announcements = readData('announcements.json');
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

app.post('/api/announcements', (req, res) => {
  try {
    const announcements = readData('announcements.json');
    const newAnnouncement = {
      id: announcements.length + 1,
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0]
    };
    announcements.push(newAnnouncement);
    writeData('announcements.json', announcements);
    res.status(201).json({ message: 'Announcement created', announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

app.put('/api/announcements/:id', (req, res) => {
  try {
    const announcements = readData('announcements.json');
    const id = parseInt(req.params.id);
    const index = announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...req.body };
      writeData('announcements.json', announcements);
      res.json({ message: 'Announcement updated', announcement: announcements[index] });
    } else {
      res.status(404).json({ error: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
});

app.delete('/api/announcements/:id', (req, res) => {
  try {
    const announcements = readData('announcements.json');
    const id = parseInt(req.params.id);
    const filtered = announcements.filter(a => a.id !== id);
    writeData('announcements.json', filtered);
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

// ====== CONTACT ROUTES ======
app.post('/api/contact', (req, res) => {
  try {
    const contacts = readData('contacts.json');
    const newContact = {
      id: contacts.length + 1,
      ...req.body,
      date: new Date().toISOString()
    };
    contacts.push(newContact);
    writeData('contacts.json', contacts);
    res.status(201).json({ message: 'Message sent successfully', contact: newContact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ====== ADMIN ROUTES ======
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy admin credentials
  if (username === 'admin@college.com' && password === 'admin123') {
    res.json({ 
      success: true, 
      message: 'Login successful',
      admin: { username, name: 'Admin User' }
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize data on startup
initializeData();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

