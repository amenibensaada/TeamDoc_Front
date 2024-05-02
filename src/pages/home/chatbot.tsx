import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import annyang from 'annyang';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Importer les icônes de Font Awesome

interface CommandData {
  command: string;
}
export interface ChatbotProps {
  folderButtonRef: React.RefObject<HTMLButtonElement | HTMLLinkElement>;
}

declare module 'annyang' {
  export function addCommands(commands: object): void;
  export function start(): void;
  export function removeCommands(commands: string | string[]): void;
  export function abort(): void; // Add the 'abort' property
}

const Chatbot: React.FC<ChatbotProps> = ({ folderButtonRef }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const alanKey = '7e3ab01599093eaf106cf4579fb5a8092e956eca572e1d8b807a3e2338fdd0dc/stage';
    const alanBtnInstance = alanBtn({
      key: alanKey,
      onCommand: (commandData: object) => {
        const data = commandData as CommandData; // Type assertion
        handleVoiceCommand(data.command);
      },
    });

    // Clean up on component unmount
    return () => {
      alanBtnInstance.deactivate();
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      
      annyang.addCommands({
        'open my YouTube': handleOpenMyYoutube,
        'open source code': handleOpenSourceCode,
        'my folder': handleOpenFolder, 
        'my shared': handleOpensharedFolder,
        'add folder': handleAddFolderCommand,
        'open folder *folderName': handleOpenFolderByName, // Ajoutez le préfixe *
        'delete folder *folderName': handleDeleteFolderByName, // Commande vocale pour supprimer le dossier

        'log out': handlelogout,

      });

      
      annyang.start();
    } else {
      
      annyang.removeCommands(['open my YouTube', 'open source code','my shared','my folder','add folder','open folder *folderName','log out','delete folder *folderName']);
      annyang.abort();
    }

    
    return () => {
      annyang.removeCommands(['open my YouTube', 'open source code','my shared','my folder','add folder','open folder *folderName','log out','delete folder *folderName']);
      annyang.abort();
    };
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    console.log("Commande vocale détectée:", command); // Ajouter un console log pour vérifier la commande vocale détectée

    if (command === 'add folder') {
      handleAddFolderCommand(); 
      console.log("Modal for adding folder should open now");
    } else if (command === 'open my YouTube') {
      handleOpenMyYoutube();
    } else if (command === 'open source code') {
      handleOpenSourceCode();
    } else if (command === 'my folders') {
      handleOpenFolder();
    }else if (command === 'my shared') {
      handleOpensharedFolder();
    }else if (command.startsWith('open folder')) {
      const folderName = command.substring(12); 
      handleOpenFolderByName(folderName); 
    }else if (command === 'log out') {
      handlelogout();
    }else if (command.startsWith('delete folder')) {
      const folderName = command.substring(14).trim(); // Supprimez "delete folder" du début et éventuels espaces en trop
      console.log("Folder Name:", folderName);
      console.log("Commande détectée: Supprimer un dossier");

      handleDeleteFolderByName(folderName);
    }
    
  };
  
  const handleAddFolderCommand = () => {
    const addButton = document.getElementById('add-folder-button');
    if (addButton) {
      addButton.click(); 
    }
  };
  
  const handleDeleteFolderByName = (folderName: string) => {
    if (folderButtonRef && folderButtonRef.current) {
        console.log("Recherche du bouton de suppression pour le dossier:", folderName);

        // Sélectionnez tous les boutons de suppression
        const deleteFolderButtons = document.querySelectorAll('.btn.link1-button') as NodeListOf<HTMLButtonElement>;

        let buttonClicked = false; 

        deleteFolderButtons.forEach((button: HTMLButtonElement) => {
            console.log("Texte du bouton:", button.textContent);

            if (button.textContent && button.textContent.trim().toLowerCase() === 'delete folder') {
                const folderElement = button.closest('.folder');
                const folderTitleElement = folderElement?.querySelector('.aziz');
                const folderTitle = folderTitleElement?.textContent?.trim();

                if (folderTitle && folderTitle.toLowerCase() === folderName.toLowerCase()) {
                    console.log("Clic sur le bouton de suppression pour le dossier:", folderName);
                    button.click();
                    console.log("Clic sur le bouton de suppression pour le dossier:", folderName);

                    buttonClicked = true;
                }
            }
        });

        if (!buttonClicked) {
            console.error(`Aucun bouton de suppression trouvé pour le dossier ${folderName}`);
        }
    }
};


  
  
  const handleOpenMyYoutube = () => {
    window.open('https://youtube.com', '_blank');
  };

  const handleOpenSourceCode = () => {
    window.open('https://github.com/amenibensaada/TeamDoc_Front.git', '_blank');
  };

  const handleOpenFolder = () => {
  window.location.href = 'http://localhost:5173/folder';
};

const handleOpensharedFolder = () => {
  window.location.href = 'http://localhost:5173/Sharedfolders';
};

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };
  
  const handleOpenFolderByName = (folderName: string) => {
    if (folderButtonRef && folderButtonRef.current) {
      console.log("folderButtonRef.current:", folderButtonRef.current); // Vérifier le contenu de folderButtonRef.current
      folderButtonRef.current.click();
    } else {
      console.error(`Aucun dossier trouvé avec le nom ${folderName}`);
    }
  };
  const handlelogout = () => {
    window.location.href = 'http://localhost:5173/login';
  };
  
  


  return (

    // Dans votre composant React
    <div>
      <button className='btn link-button' onClick={toggleListening}>
        {isListening ? <FaMicrophone /> : < FaMicrophoneSlash/>} {/* Utilisez l'icône appropriée en fonction de l'état */}
      </button>
    </div>
    
  );
};

export default Chatbot;