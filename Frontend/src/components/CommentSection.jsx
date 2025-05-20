import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ projectId, username }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/project/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComments(response.data);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    }
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        projectId,
        content: text,
        username
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setComments([response.data, ...comments]);
      setText('');
    } catch (err) {
      setError('Failed to add comment');
      console.error('Error adding comment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComments(comments.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete comment');
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {error && <div className="error-message">{error}</div>}
      <div>
        {comments.map(c => (
          <div key={c._id} className="comment">
            <b>{c.username}</b> <span>({new Date(c.createdAt).toLocaleString()})</span>
            <p>{c.content}</p>
            {c.username === username && (
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment..."
        disabled={loading}
      />
      <button 
        onClick={handleAdd} 
        disabled={loading || !text.trim()}
      >
        {loading ? 'Adding...' : 'Add Comment'}
      </button>
    </div>
  );
};

export default CommentSection; 