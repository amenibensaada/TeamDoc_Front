import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import './editcontent.css'; // Importez le fichier CSS pour les styles personnalisés
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
import boldIcon from "../sidebar/assets/bold.png";
import italicIcon from "../sidebar/assets/italic.png";
import underlineIcon from "../sidebar/assets/underline.png";
import Image from '@editorjs/image';

const EditorComponent = () => {
  const ejInstance = useRef();

  useEffect(() => {
    const initEditor = async () => {
      ejInstance.current = new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        data: DEFAULT_INITIAL_DATA,
        onChange: async () => {
          let content = await ejInstance.current.save();

          console.log(content);
        },
        tools: {
          header: Header,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: 'http://example.com/uploadImage', // Endpoint pour télécharger l'image
                byUrl: 'http://example.com/fetchImage', // Endpoint pour récupérer l'image à partir de l'URL
              },
            },
          },
        },
      });
    };

    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const handleBoldClick = () => {
    document.execCommand('bold', false, null);
    const currentBlock = ejInstance.current.blocks.getCurrentBlock();
    if (currentBlock && currentBlock.type === 'paragraph') {
      const currentData = currentBlock.data;
      ejInstance.current.blocks.update(currentBlock.id, {
        data: { ...currentData, bold: true }
      });
    }
  };
  

  const handleItalicClick = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderlineClick = () => {
    document.execCommand('underline', false, null);
  };

  const handleAlignLeftClick = () => {
    document.execCommand('justifyLeft', false, null);
  };

  const handleAlignRightClick = () => {
    document.execCommand('justifyRight', false, null);
  };

  const handleAlignCenterClick = () => {
    document.execCommand('justifyCenter', false, null);
  };

  const handleJustifyClick = () => {
    document.execCommand('justifyFull', false, null);
  };

  const handleTextColorChange = (color) => {
    document.execCommand('foreColor', false, color);
  };

  const handleFontSizeIncrease = () => {
    document.execCommand('fontSize', false, '6'); // Valeur '3' pour la taille de police moyenne
  };

  const handleFontSizeDecrease = () => {
    document.execCommand('fontSize', false, '3'); // Valeur '1' pour la taille de police plus petite
  };
  

  return (
    <div className="editor-container">
      <SideBar />
      <div id="editorjs"></div>
      <div className="sidebar">
        <h2>Options de mise en forme</h2>
        <div className="button-container">
          <button onClick={handleBoldClick}>
            <img src={boldIcon} alt="Bold" />
          </button>
          <button onClick={handleItalicClick}>
            <img src={italicIcon} alt="Italic" />
          </button>
          <button onClick={handleUnderlineClick}>
            <img src={underlineIcon} alt="Underline" />
          </button>
        </div>

        {/* Boutons d'alignement */}
        <button onClick={handleAlignLeftClick}>Align Left</button>
        <button onClick={handleAlignCenterClick}>Align Center</button>
        <button onClick={handleAlignRightClick}>Align Right</button>
        <button onClick={handleJustifyClick}>Justify</button>

        <input
          type="color"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />

        {/* Boutons de changement de taille de police */}
        <button onClick={handleFontSizeIncrease}>Increase Font Size</button>
        <button onClick={handleFontSizeDecrease}>Decrease Font Size</button>
      </div>
    </div>
  );
}

const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1,
        "bold": false, // Ajouter une propriété pour indiquer si le texte est en gras
        "italic": false, // Ajouter une propriété pour indiquer si le texte est en italique
        "underline": false, // Ajouter une propriété pour indiquer si le texte est souligné
        "color": "#000000" // Ajouter une propriété pour indiquer la couleur du texte
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "aziz",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "#0000FF"
      }
    }
  ]
}


export default EditorComponent;
