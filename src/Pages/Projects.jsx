import React, { useState } from "react";
import axios from "axios";
function Projects({ token }) {
  // Set fields
   const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [totalTarget, setTotalTarget] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState(''); 
  const [message, setMessage] = useState('');
  // ?Projects url
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No auth token found, please login first.');
      return;
    }

    const data = {
      title,
      details,
      totalTarget: Number(totalTarget),
      startTime,
      endTime,
      category: { name: category },
      tags: tags.split(',').map(tag => ({ name: tag.trim() })),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/projects/', data, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
       setMessage('Project added successfully!');
       console.log(data)
  }catch (error) {
      setMessage('Error adding project: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Details" value={details} onChange={e => setDetails(e.target.value)} required />
      <input type="number" placeholder="Total Target" value={totalTarget} onChange={e => setTotalTarget(e.target.value)} required />
      <input type="datetime-local" placeholder="Start Time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
      <input type="datetime-local" placeholder="End Time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
      <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <button className="btn btn-danger" type="submit">Add Project</button>
      <p>{message}</p>
    </form>
  )
}

export default Projects