import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "flowbite-react"; // Import Modal-related components

interface Offer {
  id_stage: number;
  id_etudiant: number;
  title: string;
  description: string;
  date_debut: string;
  date_fin: string;
  date_entretien: string;
  tags: string[];
}

interface CalendarSchedulerProps {
  offers: Offer[];
}

const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({ offers }) => {
  const [openModalIndex, setOpenModalIndex] = useState<string | null>(null); // Track the modal state as string
  const [selectedEvent, setSelectedEvent] = useState<Offer | null>(null);

  // Utility function to convert date to ISO format
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("/"); // Split based on the original date format (YYYY/MM/DD)
    return `${year}-${month}-${day}`; // Return as ISO date string (YYYY-MM-DD)
  };

  // Map offers to FullCalendar events
  const events = offers.map((offer) => ({
    id: `${offer.id_stage}-${offer.id_etudiant}`, // Make ID a unique string for comparison
    title: offer.title,
    date_debut: offer.date_debut,
    date_fin: offer.date_fin,
    start: formatDate(offer.date_entretien), // Convert date_entretien to valid ISO format
    end: formatDate(offer.date_entretien), // Ensure end date is also properly formatted
    description: offer.description, // Custom field for tooltip
    extendedProps: {
      tags: offer.tags,
    },
  }));

  // Handle event click
  const handleEventClick = (info: any) => {
    const clickedEventId = info.event.id;
    console.log("Event clicked:", clickedEventId);

    // Find the clicked event based on its ID
    const clickedOffer = offers.find(
      (offer) => `${offer.id_stage}-${offer.id_etudiant}` === clickedEventId
    );
    if (clickedOffer) {
      setSelectedEvent(clickedOffer);
      setOpenModalIndex(clickedEventId); // Set the modal to open for the clicked event
    }
  };

  // Close the modal
  const closeModal = () => {
    setOpenModalIndex(null); // Close the modal
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Entretien Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek" // Default view is the week view
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight="auto" // Automatically adjust the height
      />

      {/* Modal */}
      {selectedEvent &&
        openModalIndex ===
          `${selectedEvent.id_stage}-${selectedEvent.id_etudiant}` && (
          <Modal dismissible show onClose={closeModal}>
            <Modal.Header>{selectedEvent.title}</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedEvent.description}
                </p>
                <ul className="list-disc pl-5 text-gray-500">
                  {selectedEvent.tags.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mt-2 font-bold">
                {selectedEvent.date_debut} - {selectedEvent.date_fin}
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-gray-100">
              <p className="text-gray-700 mt-2 font-bold">
                Date d'entretien : {selectedEvent.date_entretien}. For more
                details check your email!
              </p>
            </Modal.Footer>
          </Modal>
        )}
    </div>
  );
};

export default CalendarScheduler;
