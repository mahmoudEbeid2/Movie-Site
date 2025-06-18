"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { searchByQuery } from '@/app/api/themoviedbApi';
import Pagination from '@/components/Pagination/Pagination';
import { useLanguage } from '@/app/contexts/LanguageContext';
import MovieCard from "@/components/MovieCard/MovieCard"; // Import the MovieCard component



export default function SearchResultsContainer({ initialMovies, initialTotalPages, query }) {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();


    const newSearch = useRef(true);


  useEffect(() => {
    setMovies(initialMovies);
    setTotalPages(initialTotalPages);
    setCurrentPage(1);
    newSearch.current = true;
  }, [query, initialMovies, initialTotalPages]);


  useEffect(() => {

    if (newSearch.current) {
      newSearch.current = false; 
      return;
    }

    const fetchNewMovies = async () => {
      setIsLoading(true);
      const data = await searchByQuery(query, currentPage, language);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
      window.scrollTo(0, 0);
    };

    fetchNewMovies();
  }, [currentPage, language, query]); 


  if (isLoading) {
    return <div className="text-center p-12">Loading...</div>;
  }
  
  if (!movies || movies.length === 0) {
      return (
         <div className="text-center p-12 bg-white/5 rounded-lg border border-dashed border-white/20">
            <p className="text-gray-300">No results found for "{query}".</p>
          </div>
      )
  }

  return (
    <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {movies.map((movie) => (
              <div key={movie.id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={setCurrentPage}
        />
    </div>
  );
}