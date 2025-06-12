import React, { useEffect, useState } from 'react';
import axios from '../apis/config';

const Comment = ({ comment, onReply }) => (
  <div className="border p-2 rounded mb-2">
    <p className="font-semibold">{comment.user.first_name}:</p>
    <p>{comment.content}</p>
    <button onClick={() => onReply(comment.id)} className="text-sm text-blue-600">Reply</button>
    <ReportButton type="COMMENT" commentId={comment.id} />
    {comment.replies?.length > 0 && (
      <div className="ml-4 mt-2">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} onReply={onReply} />
        ))}
      </div>
    )}
  </div>
);

const CommentsSection = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [parentId, setParentId] = useState(null);

  const fetchComments = async () => {
    const res = await axios.get(`/projects/${projectId}/comments/`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    await axios.post(`/comments/`, { project: projectId, content, parent: parentId });
    setContent('');
    setParentId(null);
    fetchComments();
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onReply={setParentId} />
      ))}
      <textarea
        className="w-full border p-2 rounded mt-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleCommentSubmit} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
        {parentId ? 'Reply' : 'Comment'}
      </button>
    </div>
  );
};

const ReportButton = ({ type, projectId, commentId }) => {
  const handleReport = async () => {
    const reason = prompt('Enter your reason for reporting:');
    if (reason) {
      await axios.post(`/reports/`, {
        report_type: type,
        reason,
        ...(projectId && { project_id: projectId }),
        ...(commentId && { comment_id: commentId }),
      });
      alert('Reported successfully');
    }
  };

  return (
    <button onClick={handleReport} className="ml-2 text-sm text-red-600">Report</button>
  );
};

export default CommentsSection;
