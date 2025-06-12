import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../apis/config';
import ImageSliderComponent from '../components/ImageSliderComponent';
import DonationComponent from '../components/DonationComponent';
import CancelProjectButton from '../components/CancelProjectButton';
import CommentsSection from '../components/CommentsSection';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/projects/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProject(res.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
console.log("Token:", localStorage.getItem('access'));

  const fetchSimilarProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/projects/${id}/similar/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSimilarProjects(res.data);
    } catch (error) {
      console.error("Error fetching similar projects:", error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchSimilarProjects();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-700 mb-2">{project.details}</p>
      <p className="text-sm text-gray-600">
        Target: ${project.totalTarget} | Starts: {new Date(project.startTime).toLocaleDateString()} | Ends: {new Date(project.endTime).toLocaleDateString()}
      </p>
      <p className="text-lg font-medium my-2">Average Rating: {project.average_rating?.toFixed(1) || 0}</p>

      <ImageSliderComponent images={project.images} />

      <div className="my-4">
        <DonationComponent projectId={id} onDonationSuccess={fetchProject} />
      </div>

      <CancelProjectButton
        projectId={id}
        canCancel={project.can_cancel}
        onCancelSuccess={fetchProject}
      />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Similar Projects</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {similarProjects.map(p => (
          <div key={p.id} className="border p-2 rounded shadow">
            <img src={p.image || '/default.jpg'} alt={p.title} className="w-full h-32 object-cover rounded" />
            <h3 className="font-bold mt-1 text-sm">{p.title}</h3>
          </div>
        ))}
      </div>

      <CommentsSection projectId={id} />
    </div>
  );
};

export default ProjectDetail;

/// // pages/ProjectDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../apis/config';
// import ImageSliderComponent from '../components/ImageSliderComponent';
// import DonationComponent from '../components/DonationComponent';
// import CancelProjectButton from '../components/CancelProjectButton';
// import CommentsSection from '../components/CommentsSection';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [similarProjects, setSimilarProjects] = useState([]);

//   const fetchProject = async () => {
//     const res = await axios.get(`/projects/${id}/`);
//     setProject(res.data);
//   };

//   const fetchSimilarProjects = async () => {
//     const res = await axios.get(`/projects/${id}/similar/`);
//     setSimilarProjects(res.data);
//   };

//   useEffect(() => {
//     fetchProject();
//     fetchSimilarProjects();
//   }, [id]);

//   if (!project) return <div>Loading...</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
//       <p className="text-gray-700 mb-2">{project.details}</p>
//       <p className="text-sm text-gray-600">
//         Target: ${project.totalTarget} | Starts: {new Date(project.startTime).toLocaleDateString()} | Ends: {new Date(project.endTime).toLocaleDateString()}
//       </p>
//       <p className="text-lg font-medium my-2">Average Rating: {project.average_rating?.toFixed(1) || 0}</p>

//       <ImageSliderComponent images={project.images} />

//       <div className="my-4">
//         <DonationComponent projectId={id} onDonationSuccess={fetchProject} />
//       </div>

//       <CancelProjectButton
//         projectId={id}
//         canCancel={project.can_cancel}
//         onCancelSuccess={fetchProject}
//       />

//       <h2 className="text-2xl font-semibold mt-8 mb-4">Similar Projects</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {similarProjects.map(p => (
//           <div key={p.id} className="border p-2 rounded shadow">
//             <img src={p.image || '/default.jpg'} alt={p.title} className="w-full h-32 object-cover rounded" />
//             <h3 className="font-bold mt-1 text-sm">{p.title}</h3>
//           </div>
//         ))}
//       </div>

//       <CommentsSection projectId={id} />
//     </div>
//   );
// };

// export default ProjectDetail;
