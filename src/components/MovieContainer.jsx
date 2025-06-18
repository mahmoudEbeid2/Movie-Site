'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getNowPlayingMovies } from "@/app/api/themoviedbApi";
import PaginationComponent from "@/components/Pagination/Pagination";

export default function MovieContainer({ initialMovies, initialTotalPages }) {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (currentPage === 1 && language === 'en-US') {
        return;
    }

    const fetchNewMovies = async () => {
      setIsLoading(true);
      const data = await getNowPlayingMovies(currentPage, language);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    };

    fetchNewMovies();
  }, [currentPage, language]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {movies.map((movie) => (
              <div key={movie.id} className="border rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full h-auto"
                />
                <div className="p-2">
                  <h3 className="font-bold text-sm truncate">{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <PaginationComponent
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}