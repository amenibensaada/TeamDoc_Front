/*import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';
import ContentService from '.src/services/ContentService' ; 

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

const Editor = () => {
  const [text, setText] = useState('');
  const [documentId, setDocumentId] = useState(null);
  const editorRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== ":id") {
      ContentService.getContent(id)
        .then(data => {
          if (data) {
            setText(data.content);
            setDocumentId(data._id);
          }
        })
        .catch(error => console.error('Error fetching existing data:', error));
    }
  }, [id]);

  useEffect(() => {
    socket.on('updateContent', (updatedContent) => {
      setText(updatedContent.content);
    });

    return () => {
      socket.off('updateContent');
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent default browser save action
        saveContent();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [text]);

  const handleChange = value => {
    setText(value);
    socket.emit('edit', { content: value });
  };

  const saveContent = () => {
    const bodyData = { content: text, documentId: documentId };
    const saveFunction = documentId ? ContentService.updateContentRealTime : ContentService.createContent;

    saveFunction(bodyData)
      .then(data => {
        if (!documentId) {
          setDocumentId(data._id);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const recoverBlock = (blockData) => {
    const { content } = blockData;
    setText(content);
  };

  return (
    <Grid>
      <ReactQuill
        ref={editorRef}
        value={text}
        onChange={handleChange}
        modules={Editor.modules}
        formats={Editor.formats}
      />
      <br />
      <Button onClick={saveContent}>Update</Button>
    </Grid>
  );
};

export default Editor;
*/