import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { BiFilterAlt } from 'react-icons/bi';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-end mb-4">
      <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
        <div className="relative flex-1 md:flex-initial">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[345px] h-[38px] border border-[#C4C4C4] rounded-l-md pl-3 text-[#8A8A8A] font-medium text-base focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 w-[41px] h-[38px] bg-[#509CDB] flex items-center justify-center rounded-r-md"
          >
            <FaSearch className="text-white" />
          </button>
        </div>
        <button
          type="button"
          className="w-[41px] h-[38px] bg-[#509CDB] flex items-center justify-center rounded-md ml-2"
        >
          <BiFilterAlt className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;