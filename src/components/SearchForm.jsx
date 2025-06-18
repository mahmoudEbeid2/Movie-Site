"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchAction } from '@/app/actions';

const SearchForm = ({ initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form
      action={searchAction}
      className=" flex items-center gap-3 w-full max-h-[46px] "
    >
      <div className="relative w-full">
        <input
          type="text"
          name="query"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search and explore...."
          className="bg-white border border-[#D7D7D7] rounded-xl text-black text-xs placeholder:text-xs rounded-lg block w-full ps-3 p-2"
        />
      </div>
      <button
        type="submit"
        
  className="btn btn-custom-yellow d-inline-flex align-items-center fw-medium py-2 px-3 text-[14px]"
   aria-label="Search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

