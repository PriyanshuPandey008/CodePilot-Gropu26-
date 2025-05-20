const Comment = require('../models/comment.model');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { projectId, content, username } = req.body;
    
    if (!projectId || !content || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const comment = new Comment({
      projectId,
      content,
      username,
      createdAt: new Date()
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

// Get all comments for a project
exports.getProjectComments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const comments = await Comment.find({ projectId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const comment = await Comment.findByIdAndUpdate(
      id,
      { content, updatedAt: new Date() },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
}; 