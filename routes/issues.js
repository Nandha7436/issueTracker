const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const Project = require('../models/project');

// Create Issue Page
router.get('/:projectId/issues/new', async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  res.render('createIssue', { project: project });
});

router.post('/:projectId/issues', async (req, res) => {
  const { title, description, labels, author } = req.body;
  const issue = new Issue({
    title,
    description,
    labels: labels.split(','),
    author,
    projectId: req.params.projectId
  });
  await issue.save();
  res.redirect(`/projects/${req.params.projectId}`);
});

// Issue Detail Page
router.get('/:id', async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('projectId');
  res.render('issueDetail', { issue: issue });
});

// Edit Issue Page
router.get('/:projectId/issues/:id/edit', async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  const project = await Project.findById(req.params.projectId);
  res.render('editIssue', { issue: issue, project: project });
});

router.put('/:projectId/issues/:id', async (req, res) => {
  const { title, description, labels, author } = req.body;
  await Issue.findByIdAndUpdate(req.params.id, {
    title,
    description,
    labels: labels.split(','),
    author
  });
  res.redirect(`/projects/${req.params.projectId}`);
});

router.delete('/:projectId/issues/:id', async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.redirect(`/projects/${req.params.projectId}`);
});

module.exports = router;
