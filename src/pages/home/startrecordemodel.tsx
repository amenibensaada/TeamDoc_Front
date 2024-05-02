import { useState } from "react";
import Modal from "react-modal";
import StartRecording from "./startRecording";

const StartRecordModal = () => {
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
        className="  bg-slate-300 px-2 flex items-center gap-6"
        onClick={openChat}>
        <img src="/public/assets/dancingAI.gif" alt="Robot Icon" className="w-6 h-6" />
        <span>Start Record</span>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeChat}
        contentLabel="Chat Modal">
        <StartRecording />
        <button
          className="  bg-slate-300 px-14 flex items-center gap-6"
          onClick={closeChat}>
          <span>Close</span>
        </button>
      </Modal>
    </div>
  );
};

export default StartRecordModal;
