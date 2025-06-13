import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [latestProjects, setLatestProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/home-projects/')
      .then(response => {
        setLatestProjects(response.data.latest_projects)
        setFeaturedProjects(response.data.featured_projects)
      })
      .catch(error => {
        console.error('Error fetching projects:', error)
      })
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏗️ Featured Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {featuredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">🆕 Latest Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
