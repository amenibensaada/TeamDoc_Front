import { createContent, getContent } from "@/services/ContentService";
import EditorJs from "@natterstefan/react-editor-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@editorjs/header";
import boldIcon from "/public/assets/bold.png";
import italicIcon from "/public/assets/italic.png";
import underlineIcon from "/public/assets/underline.png";
import SideBar from "../sidebar/sidebar";
import { useEffect, useRef, useState } from "react";
import { getDocumentById } from "../../services/ContentService";
import { getFolderById } from "../../services/documentsService";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageTool from "@editorjs/image";
import "./editcontent.css";
import CommentSection from "../comments/Comment";

import { TranslateModal } from "./translate/TranslateModal";

export const EditorReactContent = () => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editor = useRef<any>();
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>();
  const query = useQuery({
    queryKey: ["editor", id],
    queryFn: () => getContent(id || ""),
  });
  const navigateToHistory = () => {
    navigate(`/contenthistory/${id}`);
  };
  const [documentData, setDocumentData] = useState<any>();
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  console.log(documentData, isSaveDisabled);
  const documentQuery = useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentById(id || ""),
  });

  const [folderAccess, setFolderAccess] = useState("");

  useEffect(() => {
    if (documentQuery.data) {
      setDocumentData(documentQuery.data);
    }
  }, [documentQuery.data]);
  console.log(documentQuery.data);

  useEffect(() => {
    if (query.data?.content) {
      setContent(JSON.parse(query.data.content));
    }
  }, [query.data?.content]);
  const mutation = useMutation({
    mutationFn: (body: { content: string; documentId: string }) =>
      createContent(body),
  });

  if (query.data) {
    const documentId = query.data.documentId;
    getDocumentById(documentId)
      .then((document) => {
        console.log("Document:", document);
        if (document && document.folderId) {
          const folderId = document.folderId;
          getFolderById(folderId)
            .then((folder) => {
              console.log("Folder:", folder);
              setFolderAccess(folder.access);
              setIsSaveDisabled(folder.access === "view");
            })
            .catch((error) => {
              console.error("Error fetching folder:", error);
            });
        } else {
          console.error("Folder ID not found in the document");
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  }

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
      if (folderAccess !== "view") {
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
      } else {
        console.log("Access level is 'view', cannot save content.");
      }

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
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwi9bhke9/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    return { success: 1, file: { url: data.secure_url } };
  };

  const translateText = async () => {
    if (
      !content ||
      !content.blocks ||
      content.blocks.length === 0 ||
      !content.blocks[0].data ||
      !content.blocks[0].data.text
    ) {
      console.error("Text not found in data");
      return;
    }

    const textToTranslate =
      content.blocks[0].data.text + "" + content.blocks[1].data.text;
    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "839eda305db",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      body: new URLSearchParams({
        from: "en",
        to: "fr",
        text: textToTranslate,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslatedText(result.trans);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editor-container">
      <SideBar />

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
                  },
                },
                actions: {
                  delete: true,
                },
              },
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
            editor.current = editorInstance;
          }}>
          <div id="custom-editor-container" />
        </EditorJs>
      )}
      <div className="sidebar  ">
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
        <button type="button" onClick={onSave}>
          Save
        </button>
        <button onClick={translateText}>Translate Text</button>
        <button onClick={navigateToHistory}>History Page</button>

        <CommentSection />
      </div>

      <TranslateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        translatedText={translatedText ?? ""}
      />
    </div>
  );
};
