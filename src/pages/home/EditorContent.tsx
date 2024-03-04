import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import './editcontent.css'; // Importez le fichier CSS pour les styles personnalisés
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
import boldIcon from "../sidebar/assets/bold.png";
import italicIcon from "../sidebar/assets/italic.png";
import underlineIcon from "../sidebar/assets/underline.png";

const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1
      }
    },
  ]
}
const handleBoldClick = () => {
    document.execCommand('bold', false, null);
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
  
const EditorComponent = () => {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
      },
      tools: { 
        header: Header, 
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

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

export default EditorComponent;
