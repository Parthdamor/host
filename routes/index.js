const express = require('express');
const router = express.Router();
const AdminData = require('../models/AdminData'); // Make sure the path is correct

// Render the home page and fetch data
router.get('/', async (req, res) => {
    try {
        const data = await AdminData.find(); // Fetch all data
        res.render('index', { data }); // Pass data to EJS
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching data');
    }
});

// Route to handle post details
router.get('/post/:id', async (req, res) => {
    try {
        const post = await AdminData.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('post', { post: post });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving post');
    }
});

module.exports = router;
