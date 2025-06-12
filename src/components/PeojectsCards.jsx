import React from "react";
import "../assets/css/projectscards.css";
import { useNavigate } from "react-router-dom";

function ProjectsCards({ project }) {
  const navigate = useNavigate();
  const imageUrl = project.images?.[0]?.image || "";

  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="card"
      style={imageUrl ? { "--bg-image": `url(${imageUrl})` } : {}}
    >
      <div className="card-content">
        <h2 className="card-title text-white">{project.title}</h2>
        <p className="card-body text-white">
          {project.details.substring(0, 100)}
          {project.details.length > 100 ? "..." : ""}
        </p>

        <div className="project-meta text-white">
          <div>
            <span className="meta-label">Target:</span>
            <span>{project.totalTarget}$</span>
          </div>

          <div>
            <span className="meta-label">Dates:</span>
            <span>
              {new Date(project.startTime).toLocaleDateString()} -{" "}
              {new Date(project.endTime).toLocaleDateString()}
            </span>
          </div>

          {project.category && (
            <div>
              <span className="meta-label text-white">Category:</span>
              <span>{project.category.name}</span>
            </div>
          )}
        </div>

        <div className="tags-container">
          {project.tags.map((tag, id) => (
            <span className="tag text-white" key={id}>
              #{tag.name}
            </span>
          ))}
        </div>

        <button className="button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProjectsCards;

// import React from "react";
// import "../assets/css/projectscards.css";
// import { div } from "framer-motion/client";
// function ProjectsCards({ project }) {
//   const imageUrl = project.images?.[0]?.image || "";
//   return (
    
//     <div className="card" style={imageUrl ? { "--bg-image": `url(${imageUrl})` } : {}}> 
//     <div className="card-content">
//       <h2 className="card-title text-white">{project.title}</h2>
//       <p className="card-body text-white">
//       {project.details.substring(0, 100)}{project.details.length > 100 ? '...' : ''}</p>
//     <div className="project-meta text-white">
//           <div>
//             <span className="meta-label">Target:</span> 
//             <span>{project.totalTarget}$</span>
//           </div>

//           <div>
//           <span className="meta-label">Dates:</span>
//           <span>
//             {new Date(project.startTime).toLocaleDateString()} - {new Date(project.endTime).toLocaleDateString()}
//           </span>
//         </div>
// {/* Category!!! */}
//           {project.category && (
//           <div>
//             <span className="meta-label text-white">Category:</span>
//             <span>{project.category.name}</span>
//           </div>
//           )}
//         </div>
//           <div className="tags-container">
//             {project.tags.map((tag,id) => (
//             <span className="tag text-white" key={id}>#{tag.name}</span>))}
//           </div>
//           {console.log("Project Images:", project.images)}
        
//       <a href="#" className="button">
//         View Details
//       </a>
//     </div>
//   </div>
    
//   );
// }

// export default ProjectsCards;
