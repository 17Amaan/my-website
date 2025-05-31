const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');
const Job = require('./models/Job')(sequelize);

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Serve static files from public directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'jobpulse.html'));
});

// Routes for other HTML pages
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ContactUs.html'));
});

app.get('/explorejobs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'explorejobs.html'));
});

// API routes
app.post('/api/jobs', async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});

app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Category routes
app.get('/software', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'software.html'));
});

app.get('/marketing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'marketing.html'));
});

// API routes
app.post('/api/jobs', async (req, res) => {
    try {
        const { name, dob, field, gender, email, phone } = req.body;

        // Validate required fields
        if (!name || !dob || !field || !gender || !email || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create job entry
        const job = await Job.create({
            title: field,
            company: 'JobPulse',
            location: 'Hyderabad',
            salary: 'To be discussed',
            description: `Application from ${name} for ${field} position`,
            requirements: ['Resume submitted', 'Basic qualifications met'],
            category: field,
            postedBy: 1, // You might want to change this based on your user system
            applicantName: name,
            applicantEmail: email,
            applicantPhone: phone,
            applicantDob: dob,
            applicantGender: gender
        });

        res.status(201).json({ message: 'Job application submitted successfully', job });
    } catch (error) {
        console.error('Error saving job:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: 'Validation error',
                details: error.errors.map(err => err.message)
            });
        }
        res.status(500).json({ error: 'Failed to save job application' });
    }
});

app.get('/finance', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'finance.html'));
});

app.get('/healthcare', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'healthcare.html'));
});

app.get('/education', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'education.html'));
});

// Form routes
app.get('/ITform', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ITform.html'));
});

app.get('/educationform', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'educationform.html'));
});

app.get('/financeform', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'financeform.html'));
});

app.get('/healthcareform', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'healthcareform.html'));
});

app.get('/marketingform', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'marketingform.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});