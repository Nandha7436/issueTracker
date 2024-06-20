const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Issue = require('../models/issue');

// Create Project Page
router.get('/new', (req, res) => {
  res.render('createProject');
});

router.post('/', async (req, res) => {
  const { name, description, author } = req.body;
  const project = new Project({ name, description, author });
  await project.save();
  res.redirect('/');
});

// Project Detail Page
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  let query = { projectId: req.params.id };

  if (req.query.labels) {
    query.labels = { $all: req.query.labels.split(',') };
  }

  if (req.query.author) {
    query.author = req.query.author;
  }

  if (req.query.search) {
    query.$or = [
      { title: new RegExp(req.query.search, 'i') },
      { description: new RegExp(req.query.search, 'i') }
    ];
  }

  const issues = await Issue.find(query);
  res.render('projectDetail', { project: project, issues: issues, req: req });
});

// Edit Project Page
router.get('/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('editProject', { project: project });
});

router.put('/:id', async (req, res) => {
  const { name, description, author } = req.body;
  await Project.findByIdAndUpdate(req.params.id, { name, description, author });
  res.redirect(`/projects/${req.params.id}`);
});

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
