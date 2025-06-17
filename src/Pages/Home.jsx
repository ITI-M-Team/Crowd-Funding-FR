import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectsCards from '../components/PeojectsCards';
import { Link } from 'react-router-dom';

import Search from './Search';

function Home() {
  const [latestProjects, setLatestProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/home-projects/')
      .then((response) => {
        const data = response.data;
        setLatestProjects(data.latest_projects || []);
        setFeaturedProjects(data.featured_projects || []);
      })
      .catch((error) => {
        console.error('❌ Error fetching projects:', error);
        setLatestProjects([]);
        setFeaturedProjects([]);
      });
  }, []);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  return (
    <>
      {/* Welcome Message */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mt-4 mb-2">🤝 Welcome to CrowdFund</h1>
      </div>

      <div className="p-4">
        {/* Featured Projects */}
        <h1 className="text-2xl font-bold mb-4">🏗️ Featured Projects</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <div className="col" key={project.id}>
                <ProjectsCards project={project} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col">No featured projects available.</p>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <Search />
        </div>

        {/* Latest Projects */}
        <h1 className="text-2xl font-bold mb-4">🆕 Latest Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestProjects.length > 0 ? (
            latestProjects.map((proj) => {
              const imageUrl = getFullImageUrl(proj.images?.[0]?.image);
              return (
                <div
                  key={proj.id}
                  className="border rounded-xl shadow p-4 text-center bg-white"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={proj.title}
                      className="h-32 w-full rounded-md mx-auto mb-3 object-cover"
                    />
                  ) : (
                    <div className="h-32 w-full bg-gray-200 flex items-center justify-center rounded-md mb-3">
                      <span className="text-sm text-gray-500">No image</span>
                    </div>
                  )}
                  <h4 className="text-lg font-bold">{proj.title}</h4>
                  <p className="text-sm font-semibold">{proj.totalTarget} L.E</p>
                  <p className="text-xs text-gray-500">
                    {proj.details?.slice(0, 40)}...
                  </p>
                  <Link
                    to={`/projects/${proj.id}`}
                    className="inline-block mt-3 px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No latest projects found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
