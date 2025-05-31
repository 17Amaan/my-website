const express = require('express');
const router = express.Router();
const { Job, Op } = require('../models');
const auth = require('../middleware/auth');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search jobs
router.get('/search', async (req, res) => {
  const { query, category } = req.query;
  try {
    let whereClause = {};
    
    if (query) {
      whereClause = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { company: { [Op.iLike]: `%${query}%` } },
          { location: { [Op.iLike]: `%${query}%` } }
        ]
      };
    }

    if (category) {
      whereClause.category = category;
    }

    const jobs = await Job.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create job
router.post('/', auth, async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const updatedJob = await job.update(req.body);
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await job.destroy();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
