import React, { useState } from "react";

const SearchSortBar = ({
  onSearch,
  onSortChange,
  sortOptions = [],
  placeholder = "Search...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState({ field: "", direction: "asc" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleSortChange = (field) => {
    const newSort = { ...selectedSort, field };
    setSelectedSort(newSort);
    onSortChange(newSort);
  };

  const handleDirectionChange = (direction) => {
    const newSort = { ...selectedSort, direction };
    setSelectedSort(newSort);
    onSortChange(newSort);
  };

  return (
    <div className="flex justify-end gap-4">
      <div className="flex items-center gap-4 p-3 rounded-lg bg-white ">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="h-10 lg:w-56 w-44 pl-4 pr-10 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-500 active:text-violet-600 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-10 px-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-gray-700">Sort by</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* Sort Fields */}
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="text-xs font-medium text-gray-500 mb-2">Field</div>
                <div className="space-y-2">
                  {sortOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sortField"
                        value={opt.value}
                        checked={selectedSort.field === opt.value}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="text-violet-500 focus:ring-2 focus:ring-violet-500/20 border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Direction */}
              <div className="px-3 py-2">
                <div className="text-xs font-medium text-gray-500 mb-2">Direction</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="sortDirection"
                      value="asc"
                      checked={selectedSort.direction === "asc"}
                      onChange={(e) => handleDirectionChange(e.target.value)}
                      className="text-violet-500 focus:ring-2 focus:ring-violet-500/20 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Ascending</span>
                  </label>
                  <label className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="sortDirection"
                      value="desc"
                      checked={selectedSort.direction === "desc"}
                      onChange={(e) => handleDirectionChange(e.target.value)}
                      className="text-violet-500 focus:ring-2 focus:ring-violet-500/20 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Descending</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;
