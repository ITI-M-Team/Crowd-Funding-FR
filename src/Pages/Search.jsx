import React, { useState } from 'react';
import axios from 'axios';
import ProjectsCards from '../components/PeojectsCards'; 

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // ✅ هنا هنخزن الرسائل

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      // ✅ لو المستخدم ضغط من غير كتابة
      setResults([]);
      setNoResults(true);
      setErrorMessage("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/projects/search/?search=${query}`);
      const data = Array.isArray(response.data.results) ? response.data.results : response.data;
      setResults(data);
      setNoResults(data.length === 0);
      setErrorMessage(data.length === 0 ? "No projects found." : '');
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setNoResults(true);
      setErrorMessage("An error occurred while searching.");
    }
  };

  return (
    <div className="container py-5">
      <div className="mx-auto mb-4" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSearch}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button 
              className="btn btn-sm text-white" 
              style={{ backgroundColor: '#646cff' }} 
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ✅ الرسالة حسب نوع الخطأ */}
      {noResults && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {results.map((project) => (
          <div className="col" key={project.id}>
            <ProjectsCards project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
