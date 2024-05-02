import { createContent, getContent } from "@/services/ContentService";
import EditorJs from "@natterstefan/react-editor-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "@editorjs/header";
import boldIcon from "/public/assets/bold.png";
import italicIcon from "/public/assets/italic.png";
import underlineIcon from "/public/assets/underline.png";
import SideBar from "../sidebar/sidebar";
import { useEffect, useRef, useState } from "react";
import { updateContentRealTime } from "@/services/ContentService";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageTool from "@editorjs/image";
import "./editcontent.css";
import { io } from 'socket.io-client';
import { any } from "zod";

const socket = io('http://localhost:3000' , {
  transports : ["websocket" , "polling"]
}); // Remplacez l'URL par celle de votre backend



export const EditorReactContent = () => {

  


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editor = useRef<any>();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>();
  //const [content, setContent] = useState({ blocks: [{ type: 'paragraph', data: { text: 'Initial content' } }] });
  const query = useQuery({
    queryKey: ["editor", id],
    queryFn: () => getContent(id || ""),
  });

  const [keyLog, setKeyLog] = useState("");
  useEffect(() => {
    
    const handleKeyUp = (event: { key: any; }) => {
      console.log("Key pressed:", event.key);
      
      // Add your custom logic here based on the key pressed
      const updatedKeyLog = keyLog + event.key;
      setKeyLog(updatedKeyLog);

      if (event.key === "Enter") {
        socket.emit('message', updatedKeyLog);
         
        console.log("Updated Key Log:", updatedKeyLog);
        
      }
      // Show the updated keyLog in the console
      console.log("Updated Key Log:", updatedKeyLog);
    };
  
    document.addEventListener("keyup", handleKeyUp);
  
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  },  [keyLog]);

  

  useEffect(() => {
    if (query.data?.content) {
      setContent(JSON.parse(query.data.content));
    }
  }, [query.data?.content]);
  const mutation = useMutation({
    mutationFn: (body: { content: string; documentId: string }) =>
      createContent(body),
  });
  socket.on('contentUpdate', () => {
    getContent(id || "");
    console.log('Connected to WebSocket server');
  });

  socket.on('serverMessage', (data) => {
    console.log('Received content update:', data);
    const updatedBlocks = content ? [...content.blocks] : [];
    updatedBlocks.push({ type: 'paragraph', data: { text: data} });
    const updatedContent = { ...content, blocks: updatedBlocks };
    setContent(updatedContent);
  });
  
 /* socket.on('contentUpdate', (data) => {
    console.log('Received content update:', data);
    // Mettez à jour votre contenu en fonction des données reçues en temps réel
  });*/

  const onReady = () => {
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    console.log("Now I know that Editor's content changed!");
   // socket.emit('message', 'Hello from the client!');
  };

  const onSave = async () => {
    try {
      const outputData = await (editor as any).current.save();
      setContent(outputData);
      
      mutation.mutate(
        {
          content: JSON.stringify(outputData),
          documentId: id || "",
        },
        {
          onSuccess: async () => {
            query.refetch();
            // Appeler la fonction de mise à jour en temps réel
            await updateContentRealTime(id || "", JSON.stringify(outputData));

            const lastBlock = outputData.blocks[outputData.blocks.length - 1];
            const newBlockText = lastBlock?.data?.text || '';
  
            // Emit socket message with the new text
            socket.emit('message', newBlockText);
  
            // Log only the last block's text
            console.log("Last Block Text:", newBlockText);
          },
        }
      );
      console.log("Article data: ", outputData);
    } catch (e) {
      console.log("Saving failed: ", e);
    }
  };
  const handleBoldClick = () => {
    document.execCommand("bold", false, undefined);
  };

  const handleItalicClick = () => {
    document.execCommand("italic", false, undefined);
  };

  const handleUnderlineClick = () => {
    document.execCommand("underline", false, undefined);
  };
  const handleAlignLeftClick = () => {
    document.execCommand("justifyLeft", false, undefined);
  };

  const handleAlignRightClick = () => {
    document.execCommand("justifyRight", false, undefined);
  };

  const handleAlignCenterClick = () => {
    document.execCommand("justifyCenter", false, undefined);
  };

  const handleJustifyClick = () => {
    document.execCommand("justifyFull", false, undefined);
  };
  const handleTextColorChange = (color: string | undefined) => {
    document.execCommand("foreColor", false, color);
  };
  const handleFontSizeIncrease = () => {
    document.execCommand("fontSize", false, "6");
  };

  const handleFontSizeDecrease = () => {
    document.execCommand("fontSize", false, "3");
  };
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hanaromdhani");
  const response = await fetch("https://api.cloudinary.com/v1_1/dwi9bhke9/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

 

  return { success: 1, file: { url: data.secure_url } };

}; 



  return (
    <div className="editor-container">
      <SideBar />
      <button type="button" onClick={onSave}>
        Save
      </button>
  
      {content && (
        <EditorJs
          data={content}
          holder="custom-editor-container"
          onReady={onReady}
          onChange={onChange}
          reinitializeOnPropsChange={true}
          tools={{
            header: Header,
            image: {
              class: ImageTool,
              config: {
                  uploader: {
                      uploadByFile(file: File) {
                          return handleImageUpload(file);
                      }
                  },
                  actions: {
                    delete: true, 
                  },
              }
          },
          
            // embed: {
            //   class: Embed,
            //   inlineToolbar:false,
            //   config: {
            //     services: {
            //       youtube: true,
            //       coub: true
            //     }
            //   }
            // },
            // video: {
            //   class: VideoTool,
            //   config: {
            //     uploader: {
            //       uploadByFile(file: File) {
            //         return handleVideoUpload(file);
            //       },
            //     },
            //   },
            // }
          }}
          editorInstance={(editorInstance) => {
            editor.current = editorInstance
          }}>
          <div id="custom-editor-container" />
        </EditorJs>
      )}
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

        <button onClick={handleAlignLeftClick}>Align Left</button>
        <button onClick={handleAlignCenterClick}>Align Center</button>
        <button onClick={handleAlignRightClick}>Align Right</button>
        <button onClick={handleJustifyClick}>Justify</button>

        <input
          type="color"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />

        <button onClick={handleFontSizeIncrease}>Increase Font Size</button>
        <button onClick={handleFontSizeDecrease}>Decrease Font Size</button>
      </div>
    </div>
  );
  
};
