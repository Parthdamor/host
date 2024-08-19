const express = require('express');
const basicAuth = require('express-basic-auth');
const router = express.Router();
const AdminData = require('../models/AdminData');

// Basic authentication middleware
const adminAuth = basicAuth({
    users: { 'parth': 'parth8780' },
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
});

// Apply authentication middleware to all admin routes
router.use(adminAuth);

// Render the admin page and fetch data
router.get('/', async (req, res) => {
    try {
        const data = await AdminData.find(); // Fetch all data
        const message = req.query.message || null; // Get message from query or set to null
        res.render('admin', { data, message }); // Pass data and message to EJS
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching data');
    }
});

router.post('/submit', async (req, res) => {
    try {
        const { title, subtitle, description, imageUrl, videoUrl, tags } = req.body;
        const newItem = new AdminData({
            title,
            subtitle,
            description,
            imageUrl,
            videoUrl,
            tags
        });
        await newItem.save();
        res.redirect('/admin?message=Data added successfully');
    } catch (err) {
        console.error('Error adding data:', err);
        res.redirect('/admin?message=Error adding data');
    }
});


// Render the edit page with data for the specific item
router.get('/edit/:id', async (req, res) => {
    try {
        const item = await AdminData.findById(req.params.id); // Fetch item by ID
        if (!item) {
            return res.redirect('/admin?message=Item not found'); // Redirect if item not found
        }
        res.render('edit', { item, message: req.query.message || null }); // Render edit page with item data
    } catch (err) {
        console.error('Error fetching item data:', err);
        res.redirect('/admin?message=Error fetching item data');
    }
});

// Handle form submission for updating data
router.post('/edit/:id', async (req, res) => {
    console.log('Edit POST route hit with ID:', req.params.id);
    try {
        const { title, subtitle, description, imageUrl, videoUrl, tags } = req.body;
        console.log('Data received:', { title, subtitle, description, imageUrl, videoUrl, tags });
        await AdminData.findByIdAndUpdate(req.params.id, { title, subtitle, description, imageUrl, videoUrl, tags });
        res.redirect(`/admin?message=Data updated successfully`);
    } catch (err) {
        console.error('Error updating data:', err);
        res.redirect(`/admin/edit/${req.params.id}?message=Error updating data`);
    }
});

// Handle the deletion of an item
router.get('/delete/:id', async (req, res) => {
    try {
        await AdminData.findByIdAndDelete(req.params.id);
        res.redirect('/admin?message=Data deleted successfully');
    } catch (err) {
        console.log(err);
        res.redirect('/admin?message=Error deleting data');
    }
});

module.exports = router;
