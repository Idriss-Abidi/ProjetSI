import React, { useState } from "react";
import { Button, FileInput, Label, Modal, Pagination } from "flowbite-react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchCardsProps {
    query: string;
    setQuery: (value: string) => void;
  }
  
  const SearchCards: React.FC<SearchCardsProps> = ({ query, setQuery }) => {
  
  return (
    <div className="flex-1 w-full md:w-4/12  max-sm:w-full flex justify-start items-center">
      <Combobox value={query} onChange={(value) => setQuery(value ?? "")}> 
        <div className="relative w-full md:w-66 md:m-auto">
          {/* Button for the combobox */}
          <Combobox.Button className="absolute top-[14px] left-3">
            <FaSearch className="text-gray-400" size={20} />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="w-full h-[48px] pl-16 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm "
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or description..."
          />
        </div>
      </Combobox>
    </div>
  );
};

const CardList = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null); // Track which modal is open
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [query, setQuery] = useState(""); // Search query state

  // Original card data expanded for pagination
  const cardData = [
    {
      title: "Life hack 1",
      description: "How to park your car at your garage?",
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: ["Park closer to the wall.", "Use mirrors effectively.", "Keep the garage clear."],
    },
    {
      title: "Life hack 2",
      description: "Learn to save time while cooking!",
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: ["Prepare ingredients beforehand.", "Use multitasking appliances.", "Keep the workspace organized."],
    },
    {
      title: "Life hack 3",
      description: "Organize your workspace effectively.",
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: ["Declutter regularly.", "Label all storage.", "Use ergonomic furniture."],
    },
    {
      title: "Life hack 4",
      description: "Exercise daily with minimal time.",
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: ["Stretch in the morning.", "Take quick walks.", "Use fitness apps."],
    },
    {
      title: "Life hack 5",
      description: "How to stay focused while studying?",
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: ["Eliminate distractions.", "Take regular breaks.", "Use the Pomodoro technique."],
    },
    // Add as many cards as needed to exceed 12 for pagination testing
    ...Array.from({ length: 20 }, (_, i) => ({
      title: `Life hack ${i + 6}`,
      description: `Learn about life hack ${i + 6}!`,
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      tips: [`Tip 1 for life hack ${i + 6}`, `Tip 2 for life hack ${i + 6}`, `Tip 3 for life hack ${i + 6}`],
    })),
  ];
   
  // Filter cards based on query
  const filteredCards = query
  ? cardData.filter((card) =>
      // Combine title, description, and tips into a single searchable string
      `${card.title} ${card.description} ${card.tips.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  : cardData;

  const CARDS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  // Get the cards to display for the current page
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + CARDS_PER_PAGE);

  return (
    <div>
      {/* Single Search Bar */}
      <SearchCards query={query} setQuery={setQuery} />

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {currentCards.map((card, index) => (
          <div key={index} className="card glass w-66 h-[500px]">
            <figure>
              <img src={card.imgSrc} alt={card.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p>
                {card.description.length > 150
                  ? `${card.description.slice(0, 150)}...`
                  : card.description}
              </p>
              <div className="card-actions justify-end">
                <Button onClick={() => setOpenModalIndex(startIndex + index)}>
                  Toggle modal
                </Button>

                {/* Modal for each card */}
                <Modal
                  dismissible
                  show={openModalIndex === startIndex + index}
                  onClose={() => setOpenModalIndex(null)}
                >
                  <Modal.Header>{card.title}</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {card.description}
                      </p>
                      <ul className="list-disc pl-5 text-gray-500">
                        {card.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div>
                        <Label
                          htmlFor="default-file-upload"
                          value="Default size file input"
                        />
                      </div>
                      <FileInput id="default-file-upload" />
                    </div>
                    <div className="col-span-2 flex justify-center gap-x-4">
                      <Button
                        className="w-[30%]"
                        onClick={() => setOpenModalIndex(null)}
                      >
                        Postuler
                      </Button>
                      <Button
                        className="w-[30%]"
                        color="red"
                        onClick={() => setOpenModalIndex(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showIcons
        />
      </div>
    </div>
  );
};

export default CardList;
