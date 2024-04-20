import React, { useState } from "react";
import { createdocuments } from "@/services/documentsService";

const AddDocumentForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ Title: "", contentType: "" });

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
      await createdocuments(formData);
      setFormData({ Title: "", contentType: "" });
      onClose();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="add-document-form">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <input
          type="text"
          name="Title"
          value={formData.Title}
          placeholder="Title"
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="contentType"
          value={formData.contentType}
          placeholder="Description"
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600">
          Add Document
        </button>
      </form>
    </div>
  );
};

export default AddDocumentForm;

