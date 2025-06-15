import React, { useState } from 'react';
import axios from 'axios';
import ProjectsCards from '../components/PeojectsCards'; 

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/search/?search=${query}`);
      const data = Array.isArray(response.data.results) ? response.data.results : response.data;
      setResults(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setNoResults(true);
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
            <button className="btn btn-success btn-sm" type="submit">Search</button>
          </div>
        </form>
      </div>

      {noResults && <p className="text-danger text-center">No projects found.</p>}

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
