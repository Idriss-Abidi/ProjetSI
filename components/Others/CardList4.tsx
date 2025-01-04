import React, { useState } from "react";
import { Button, Modal, Pagination, Card, Dropdown } from "flowbite-react";

const CardList4 = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null); // Track which modal is open
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Track selected checkboxes

  // Original card data expanded for pagination
  const cardData = [
    {
      title: "Life hack 1",
      description: "How to park your car at your garage?",
      tips: ["Park closer to the wall.", "Use mirrors effectively.", "Keep the garage clear."],
    },
    {
      title: "Life hack 2",
      description: "Learn to save time while cooking!",
      tips: ["Prepare ingredients beforehand.", "Use multitasking appliances.", "Keep the workspace organized."],
    },
    {
      title: "Life hack 3",
      description: "Organize your workspace effectively.",
      tips: ["Declutter regularly.", "Label all storage.", "Use ergonomic furniture."],
    },
    {
      title: "Life hack 4",
      description: "Exercise daily with minimal time.",
      tips: ["Stretch in the morning.", "Take quick walks.", "Use fitness apps."],
    },
    {
      title: "Life hack 5",
      description: "How to stay focused while studying?",
      tips: ["Eliminate distractions.", "Take regular breaks.", "Use the Pomodoro technique."],
    },
    // Add as many cards as needed to exceed 12 for pagination testing
    ...Array.from({ length: 20 }, (_, i) => ({
      title: `Life hack ${i + 6}`,
      description: `Learn about life hack ${i + 6}!`,
      tips: [`Tip 1 for life hack ${i + 6}`, `Tip 2 for life hack ${i + 6}`, `Tip 3 for life hack ${i + 6}`],
    })),
  ];

  const CARDS_PER_PAGE = 9;
  const totalPages = Math.ceil(cardData.length / CARDS_PER_PAGE);

  // Get the cards to display for the current page
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const currentCards = cardData.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div>
      {/* Filters Section */}
      <div className="flex items-center space-x-4 mt-4 py-4">
        <div>Datepicker Placeholder</div>
        <div>Datepicker Placeholder</div>
        <div className="flex items-center gap-4">
          <Dropdown label="Select options" size="sm">
            <div className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCheckboxChange("Option 1")}
                  checked={selectedOptions.includes("Option 1")}
                />
                <span>Option 1</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCheckboxChange("Option 2")}
                  checked={selectedOptions.includes("Option 2")}
                />
                <span>Option 2</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCheckboxChange("Option 3")}
                  checked={selectedOptions.includes("Option 3")}
                />
                <span>Option 3</span>
              </label>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <Card key={index} className="max-w-sm m-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
            <Button onClick={() => setOpenModalIndex(startIndex + index)}>
              Read more
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
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
              <Modal.Footer>
                <Button onClick={() => setOpenModalIndex(null)}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModalIndex(null)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
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

export default CardList4;
