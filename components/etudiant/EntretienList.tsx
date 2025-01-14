import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";

import { Modal } from "flowbite-react"; // Import Modal-related components
import { Entretien } from "@/types"; // Ensure this type is correctly defined

interface CalendarSchedulerProps {
  entretiens: Entretien[];
}

const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({
  entretiens = [],
}) => {
  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Entretien | null>(null);

  // Utility function to ensure ISO date format
  const formatDate = (date: string): string => {
    if (!date) return ""; // Handle missing date gracefully
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  };
  const offers = entretiens?.filter(
    (entretien) => entretien.statutEntretien === "EN_COURS"
  ); // Map offers to FullCalendar events
  const events =
    offers?.map((offer) => ({
      id: `${offer.stage.idStage}-${offer.etudiant.idEtudiant}`,
      title: offer.stage.titre,
      start: offer.dateEntretien.split("T")[0],
      end: offer.dateEntretien.split("T")[0],
      description: offer.stage.description,
      extendedProps: {
        tags: offer.stage.tags,
        dateDebut: formatDate(offer.stage.dateDebut),
        dateFin: formatDate(offer.stage.dateFin),
      },
    })) || [];

  // Handle event click
  const handleEventClick = (info: any) => {
    const clickedEventId = info.event.id;
    const clickedOffer = offers.find(
      (offer) =>
        `${offer.stage.idStage}-${offer.etudiant.idEtudiant}` === clickedEventId
    );
    if (clickedOffer) {
      setSelectedEvent(clickedOffer);
      setOpenModalIndex(clickedEventId);
    }
  };

  // Close the modal
  const closeModal = () => {
    setOpenModalIndex(null);
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Calendrier des Entretiens</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="listWeek"
        events={events}
        eventClick={handleEventClick}
        locale={frLocale} // Set the locale to French
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "listWeek dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight="auto"
        displayEventTime={false} // Hide event times
        displayEventEnd={false} // Hide event end times
      />

      {/* Modal */}
      {selectedEvent &&
        openModalIndex ===
          `${selectedEvent.stage.idStage}-${selectedEvent.etudiant.idEtudiant}` && (
          <Modal dismissible show onClose={closeModal}>
            <Modal.Header>{selectedEvent.stage.titre}</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedEvent.stage.description}
                </p>
                <ul className="list-disc pl-5 text-gray-500">
                  {selectedEvent.stage.tags?.split(",").map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mt-2 font-bold">
                {selectedEvent.stage.dateDebut.split("T")[0]} -{" "}
                {selectedEvent.stage.dateFin.split("T")[0]}
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-gray-100">
              <p className="text-gray-700 mt-2 font-bold">
                Date d'entretien : {selectedEvent.dateEntretien.split("T")[0]}.
                Pour plus de détails, vérifiez votre email !
              </p>
            </Modal.Footer>
          </Modal>
        )}
    </div>
  );
};

export default CalendarScheduler;
