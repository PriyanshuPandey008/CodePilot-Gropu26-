const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/',commentController.createComment);

// Get all comments for a project
router.get('/project/:projectId',commentController.getProjectComments);

// Update a comment
router.put('/:id', commentController.updateComment);

// Delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router; 