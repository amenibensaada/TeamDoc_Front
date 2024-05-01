import { useState } from "react";
import Modal from "react-modal";
import Chat from "./Chat";

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="  bg-inherit  flex items-center gap-6 "
        onClick={openChat}>
        <img src="/assets/iconAI.png" alt="Robot Icon" className=" h-9 w-9" />
        <span>Open Chat</span>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeChat}
        contentLabel="Chat Modal">
        <Chat />
        <button
          className="  bg-slate-300 px-14 flex items-center gap-6"
          onClick={closeChat}>
          <img src="/assets/iconAI.png" alt="Robot Icon" className="w-6 h-6" />
          <span>Close Chat</span>
        </button>
      </Modal>
    </div>
  );
};

export default ChatModal;
