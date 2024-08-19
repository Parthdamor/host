const mongoose = require('mongoose');

const adminDataSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    imageUrl: String,
    videoUrl: String,
    tags: [String] // Assuming tags is an array of strings
});

const AdminData = mongoose.model('AdminData', adminDataSchema);

module.exports = AdminData;
