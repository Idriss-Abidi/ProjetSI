import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface SearchCardsProps {
  cards: { title: string; description: string }[]; // Adjust card structure as needed
  setFilteredCards: (filtered: { title: string; description: string }[]) => void;
}

const SearchCards = ({ cards, setFilteredCards }: SearchCardsProps) => {
  const [query, setQuery] = useState<string>("");

  const filteredCards =
    query === ""
      ? cards
      : cards.filter((card) =>
          `${card.title} ${card.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  // Update the parent state whenever filtered cards change
  setFilteredCards(filteredCards);

  return (
    <div className="search-cards">
      <Combobox
        value={query}
        onChange={(value) => setQuery(value ?? "")} // Handle null values gracefully
      >
        <div className="relative w-full">
          {/* Button for the combobox */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="https://assets.stickpng.com/images/585e4ae1cb11b227491c3393.png"
              width={20}
              height={20}
              className="ml-4"
              alt="Search"
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="search-cards__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or description..."
          />

          {/* Transition for displaying the options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredCards.length === 0 && query !== "" ? (
                <Combobox.Option value={null} className="search-cards__option">
                  No results found for "{query}"
                </Combobox.Option>
              ) : (
                filteredCards.map((card, index) => (
                  <Combobox.Option
                    key={index}
                    value={card.title}
                    className={({ active }) =>
                      `relative search-cards__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {card.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {card.description}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchCards;
