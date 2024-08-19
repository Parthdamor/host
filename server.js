const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/index'); // Updated to use indexRoutes
const adminRoutes = require('./routes/admin');
const AdminData = require('./models/AdminData');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// for edit
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use routes
app.use('/', indexRoutes); // Updated to use indexRoutes
app.use('/admin', adminRoutes);
app.use(express.static('public'));

// Replace <password> with your actual MongoDB Atlas password
mongoose.connect('mongodb+srv://parthdamor:parthhackerdatabase@parthserver8849160175.jnyf2zz.mongodb.net/parthdamor?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected to Atlas'))
.catch(err => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
