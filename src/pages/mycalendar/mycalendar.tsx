import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import "./modal.css";
import SideBar from "../sidebar/sidebar";

const localizer = momentLocalizer(moment);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyCalendar = (props: any) => {
  console.log(props);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminderText, setReminderText] = useState("");

  const events = [
    {
      id: 1,
      title: "Meeting",
      start: new Date(2024, 4, 1, 10, 0),
      end: new Date(2024, 4, 1, 12, 0),
    },
    {
      id: 2,
      title: "Conference",
      start: new Date(2024, 4, 10, 13, 0),
      end: new Date(2024, 4, 10, 17, 0),
    },
  ];

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleReminderSubmit = () => {
    // Logique pour enregistrer le rappel avec reminderText
    console.log(
      "Rappel enregistré pour le",
      selectedDate,
      "avec le texte:",
      reminderText
    );
    setModalIsOpen(false);
    setReminderText(""); // Réinitialiser le texte du rappel après la fermeture de la fenêtre modale
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[240px_1fr] overflow-hidden">
      <SideBar />
      <div style={{ height: 500, position: "relative" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          className=" mx-60 my-40"
          style={{ maxWidth: "800px" }}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay">
          <div className="modal-header">
            <h2 className="modal-title">Enregistrer un rappel</h2>
            <button onClick={closeModal} className="close-button">
              X
            </button>
          </div>
          <div className="modal-body">
            <h3 className="date-title">
              Pour le {selectedDate && moment(selectedDate).format("LL")}
            </h3>
            <input
              type="text"
              placeholder="Entrez votre rappel ici"
              className="modal-input"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button onClick={handleReminderSubmit} className="modal-button">
              Enregistrer
            </button>
            <button onClick={closeModal} className="modal-button">
              Annuler
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyCalendar;
