const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { isAdmin } = require('../middleware/authMiddleware');

// Get all news
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create news (Admin)
router.post('/', isAdmin, async (req, res) => {
    const news = new News(req.body);
    try {
        const newNews = await news.save();
        res.status(201).json({ success: true, data: newNews });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete news (Admin)
router.delete('/:id', isAdmin, async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
