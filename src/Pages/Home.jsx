import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectsCards from "../components/PeojectsCards"

function Home() {
  const [latestProjects, setLatestProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/home-projects/')
      .then(response => {
        const data = response.data
        setLatestProjects(data.latest_projects || [])
        setFeaturedProjects(data.featured_projects || [])
      })
      .catch(error => {
        console.error('❌ Error fetching projects:', error)
        setLatestProjects([])
        setFeaturedProjects([])
      })
  }, [])

  return (
    <div className="p-4">
      {/* Featured Projects */}
      <h1 className="text-2xl font-bold mb-4">🏗️ Featured Projects</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-8">
        {featuredProjects.length > 0 ? (
          featuredProjects.map(project => (
            <div className="col" key={project.id}>
              <ProjectsCards project={project} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col">No featured projects available.</p>
        )}
      </div>

      {/* Latest Projects */}
      <h1 className="text-2xl font-bold mb-4">🆕 Latest Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestProjects.length > 0 ? (
          latestProjects.map(proj => (
            <div key={proj.id} className="border rounded shadow p-4 text-center">
              {proj.images?.[0] && (
                <img
                  src={`http://localhost:8000${proj.images[0].image}`}
                  alt="Project"
                  className="h-20 w-20 rounded-full mx-auto mb-3 object-cover"
                />
              )}
              <h4 className="text-lg font-bold">{proj.title}</h4>
              <p className="text-sm">{proj.totalTarget} L.E</p>
              <p className="text-xs text-gray-500">{proj.details?.slice(0, 40)}...</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No latest projects found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
