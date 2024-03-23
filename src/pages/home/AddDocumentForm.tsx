// import React, { useState } from "react";
// import { createdocuments } from "@/services/documentsService";

// const AddDocumentForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({ Title: "", contentType: "" });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createdocuments(formData); 
//       setFormData({ Title: "", contentType: "" }); 
//       onClose(); 
//     } catch (error) {
//       console.error("Error adding document:", error);
//     }
//   };

//   return (
//     <div className="add-document-form">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="Title"
//           value={formData.Title}
//           placeholder="Title"
//           onChange={handleInputChange}
//         />
//         <textarea
//           name="contentType"
//           value={formData.contentType}
//           placeholder="Description"
//           onChange={handleInputChange}
//         ></textarea>
//         <button type="submit">Add Document</button>
//       </form>
//     </div>
//   );
// };

// export default AddDocumentForm;
import React, { useState, useEffect } from "react";
import { createdocuments, updatedocuments } from "@/services/documentsService";

const AddDocumentForm = ({ onClose, initialDocumentData }) => {
  const [formData, setFormData] = useState({ Title: "", contentType: "" });

  // If initialDocumentData is provided, set the formData with its values
  useEffect(() => {
    if (initialDocumentData) {
      setFormData(initialDocumentData);
    }
  }, [initialDocumentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialDocumentData) {
        // If initialDocumentData exists, update the document
        await updatedocuments(initialDocumentData._id, formData); 
      } else {
        // Otherwise, create a new document
        await createdocuments(formData); 
      }
      setFormData({ Title: "", contentType: "" }); 
      onClose(); 
    } catch (error) {
      console.error("Error adding/updating document:", error);
    }
  };

  return (
    <div className="add-document-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          placeholder="Title"
          onChange={handleInputChange}
        />
        <textarea
          name="contentType"
          value={formData.contentType}
          placeholder="Description"
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">{initialDocumentData ? "Update Document" : "Add Document"}</button>
      </form>
    </div>
  );
};

export default AddDocumentForm;
