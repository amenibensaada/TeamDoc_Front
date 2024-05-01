import { createContent, getContent } from "@/services/ContentService";
import EditorJs from "@natterstefan/react-editor-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Header from "@editorjs/header";
import boldIcon from "/public/assets/bold.png";
import italicIcon from "/public/assets/italic.png";
import underlineIcon from "/public/assets/underline.png";
import { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Embed from "@editorjs/embed";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageTool from "@editorjs/image";
import "./editcontent.css";
import ChatModal from "../ai/ChatModal";
//import { TextGenerationTool } from "./TextGenerationTool";

//import SimpleVideo from 'simple-video-editorjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CodeTool from "@editorjs/code";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InlineCode from "@editorjs/inline-code";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Table from "@editorjs/table";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import delimiter from "@editorjs/delimiter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import list from "@editorjs/list";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkTool from "@editorjs/link";
import StartRecordModal from "./startrecordemodel";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface Block {
  id: string;
  type: string;
  data: {
    text?: string;
    file?: {
      url: string;
    };
    items?: string[];
    url: string;
    code: string;
  };
}

interface Content {
  blocks: Block[];
}
//stylesheetpdf
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
  },
  image: {
    marginBottom: 20,
    maxWidth: "100%",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  list: {
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 20, 
  },
  code: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#000000",
    padding: 5,
    marginBottom: 10,
  },
});

const MyDocument: React.FC<{ content: Content }> = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {content.blocks.map((block: Block, index: number) => {
        if (block.type === "header") {
          return (
            <Text key={index} style={styles.header}>
              {block.data.text}
            </Text>
          );
        } else if (block.type === "paragraph") {
          return (
            <Text key={index} style={styles.paragraph}>
              {block.data.text}
            </Text>
          );
        } else if (
          block.type === "image" &&
          block.data.file &&
          block.data.file.url
        ) {
          return (
            <Image key={index} src={block.data.file.url} style={styles.image} />
          );
        } else if (block.type === "list" && block.data.items) {
          return (
            <ol key={index} style={styles.list}>
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} style={styles.listItem}>
                  <Text>{item}</Text>
                </li>
              ))}
            </ol>
          );
        } else if (block.type === "link" && block.data.url) {
          // Vérifiez si l'URL est une URL externe ou interne
          const isExternalLink = block.data.url.startsWith("http");
          if (isExternalLink) {
            return (
              <Link key={index} to={block.data.url} style={styles.link}>
                {block.data.text}
              </Link>
            );
          } else {
            return (
              <Link key={index} to={block.data.url} style={styles.link}>
                {block.data.text}
              </Link>
            );
          }
        } else if (block.type === "code" && block.data.code) {
          return (
            <code key={index} style={styles.code}>
              {block.data.code}
            </code>
          );
        }
        return null;
      })}
    </Page>
  </Document>
);

export const EditorReactContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editor = useRef<any>();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>();
  const [saveClicked, setSaveClicked] = useState(false);

  const query = useQuery({
    queryKey: ["editor", id],
    queryFn: () => getContent(id || ""),
  });

  useEffect(() => {
    if (query.data?.content) {
      setContent(JSON.parse(query.data.content));
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
    // handleContentChange(content);

    console.log(content);
    console.log("Now I know that Editor's content changed!");
  };
  // fonction save editor
  const onSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const outputData = await (editor as any).current.save();
      console.log(outputData);

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
      setSaveClicked(true);
      console.log(content);
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

  //image
  const handleMediaUpload = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hanaromdhani");

    let uploadUrl = "";
    if (type === "image") {
      uploadUrl = "https://api.cloudinary.com/v1_1/dwi9bhke9/image/upload";
    } else if (type === "video") {
      uploadUrl = "https://api.cloudinary.com/v1_1/dwi9bhke9/video/upload";
    }

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return { success: 1, file: { url: data.secure_url } };
  };

  //pdf
  const handleDownloadPDF = async () => {
    const doc = <MyDocument content={content} />;
    const asPdf = pdf();

    asPdf.updateContainer(doc);

    const blob = await asPdf.toBlob();
    saveAs(blob, "document.pdf");
  };

  //verification de click de button save
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Vérifier si le contenu a été modifié et si le bouton "Save" n'a pas été cliqué
      if (content && !saveClicked) {
        // Afficher une alerte personnalisée
        event.preventDefault();
        event.returnValue = "";
      }
    };
    // Ajouter l'écouteur d'événement beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content, saveClicked]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="editor-container">
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
                      return handleMediaUpload(file, "image");
                    },
                  },
                  actions: {
                    delete: true,
                  },
                },
              },

              embed: {
                class: Embed,
                inlineToolbar: false,
                config: {
                  services: {
                    youtube: true,
                    coub: true,
                    video: true,
                  },
                  uploader: {
                    uploadByFile(file: File) {
                      return handleMediaUpload(file, "video");
                    },
                  },
                  actions: {
                    delete: true,
                  },
                },
              },
              paragraph: {
                class: Paragraph,
                inlineToolbar: true,
              },
              code: {
                class: CodeTool,
                config: {
                  // handleColorcode: handleColorcode,
                },
              },
              inlineCode: InlineCode,
              linkTool: {
                class: LinkTool,
                inlineToolbar: true,
              },
              table: Table,
              list: list,
              delimiter: delimiter,
            }}
            editorInstance={(editorInstance) => {
              editor.current = editorInstance;
            }}
          >
            <div id="custom-editor-container" />
          </EditorJs>
        )}
        <div className="sidebar">
          <h2>Use our ChatBot for instant assistance!</h2>
          <div className="relative">
            <ChatModal />
          </div>

          <h2>Setting</h2>

          <button
            type="button"
            onClick={onSave}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-200"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-1 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Download PDF
          </button>
          <div className="relative">
            <StartRecordModal />
          </div>
     

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
    </div>
  );
};
