// index.js
import { createContent, getContent } from "@/services/ContentService";
import EditorJs from "@natterstefan/react-editor-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "@editorjs/header";
import boldIcon from "../sidebar/assets/bold.png";
import italicIcon from "../sidebar/assets/italic.png";
import underlineIcon from "../sidebar/assets/underline.png";
import SideBar from "../sidebar/sidebar";
import { useEffect, useRef, useState } from "react";
import ImageTool from '@editorjs/image'; // Modifiez cette ligne
import UploadForm from "./UploadForm";


export const EditorReactContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editor = useRef<any>();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>();
  const query = useQuery({
    queryKey: ["editor", id],
    queryFn: () => getContent(id || ""),
  });

  useEffect(() => {
    if (query.data?.content) {
      setContent(JSON.parse(query.data.content));
      console.log(query.data)
    }
  }, [query.data?.content]);
  const mutation = useMutation({
    mutationFn: (body: { content: string; documentId: string }) =>
      createContent(body),
  });

  const onReady = () => {
    console.log("Editor.js is ready to work!");
  };

  const onChange = () => {
    console.log("Now I know that Editor's content changed!");
  };

  const onSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const outputData = await (editor as any).current.save();

      setContent(outputData);
      mutation.mutate(
        {
          content: JSON.stringify(outputData),
          documentId: id || "",
        },
        {
          onSuccess: () => {
            query.refetch();
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
            image: ImageTool 
          }}
          editorInstance={(editorInstance) => {
            editor.current = editorInstance;
          }}
        >
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
