// // import { Link } from "react-router-dom";
// // import './card.css';
// // import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
// // import { getDocumentsbyid } from "@/services/documentsService";


// // //<Link to={`/editor/${noteId}`}>


// // const StaticFileCard = ({ title,description, noteId, onDelete,onEdit }) => {

// //   const handleDelete = () => {
// //     onDelete(noteId); 
// //   };
// //   const handleEdit = async (noteId) => {
// //     try {
// //       const documentData = await getDocumentsbyid(noteId);
// //       onEdit(documentData);
// //     } catch (error) {
// //       console.error("Error fetching document for editing:", error);
// //     }
// //   };

// //   return (
    
// //     <div className="static-file-card">
// //       <h3>{title}</h3>
// //       <p>{description}</p>
// //       <Link to={`/editor/65f2fbe78e9282e0755a60dd`}>
     
// //         <button>Ajouter une note</button>
// //       </Link>
// //       <button onClick={handleDelete}>Delete</button>
// //       <button onClick={() => handleEdit(noteId)}>Edit Document</button>
// //     </div>
// //   );
// // };

// // export default StaticFileCard;
// import { Link } from "react-router-dom";
// import './card.css';
// import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
// import { getDocumentsbyid } from "@/services/documentsService";


// const StaticFileCard = ({ title, description, noteId, onDelete, onEdit }) => {

//   const handleDelete = () => {
//     onDelete(noteId); 
//   };
  
//   const handleEdit = async (noteId) => {
//     try {
//       const documentData = await getDocumentsbyid(noteId);
//       onEdit(documentData);
//     } catch (error) {
//       console.error("Error fetching document for editing:", error);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-sm text-gray-600 mb-4">{description}</p>
//       <Link to={`/editor/65f2fbe78e9282e0755a60dd`}>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add Content</button>
//       </Link>
//       <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={handleDelete}>Delete</button>
//       <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => handleEdit(noteId)}>Edit Document</button>
//     </div>
//   );
// };

// export default StaticFileCard;

import { Link } from "react-router-dom";
import './card.css';
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
import { getDocumentsbyid } from "@/services/documentsService";

const StaticFileCard = ({ title, description, noteId, onDelete, onEdit }) => {

  const handleDelete = () => {
    onDelete(noteId); 
  };
  
  const handleEdit = async (noteId) => {
    try {
      const documentData = await getDocumentsbyid(noteId);
      onEdit(documentData);
    } catch (error) {
      console.error("Error fetching document for editing:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex space-x-2">
  <Link to={`/editor/65f2fbe78e9282e0755a60dd`}>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
  </Link>
 
  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => handleEdit(noteId)}>
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m0 0V11m0 0v3m0-3h3m-3 0H9" />
    </svg>
  </button>
  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={handleDelete}>
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
    
  </button>
</div>

    </div>
  );
};

export default StaticFileCard;
