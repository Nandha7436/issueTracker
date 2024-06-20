const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Home Page - List of projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('home', { projects: projects });
});

module.exports = router;
