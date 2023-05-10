import { useState } from "react";

interface FilterProps {
  filter: string[];
  setFilter: (filter: string[]) => void;
}

const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"
];

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newSelectedTypes);
    setFilter(newSelectedTypes);
  };

  return (
    <div className="flex flex-row flex-wrap my-4">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={`mx-1 my-1 px-2 py-1 rounded ${
            selectedTypes.includes(type)
              ? "bg-red-500 text-white border-4 border-black"
              : "bg-blue-500 text-white border-4 border-black"
          } hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Filter;
