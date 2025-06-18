"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getNowPlayingMovies } from "@/app/api/themoviedbApi";
import PaginationComponent from "@/components/Pagination/Pagination";
import MovieCard from "@/components/MovieCard/MovieCard";

export default function MovieContainer({ initialMovies, initialTotalPages }) {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchNewMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getNowPlayingMovies(currentPage, language);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      currentPage === 1 &&
      language === "en-US" &&
      movies === initialMovies &&
      initialMovies.length > 0
    ) {
      return;
    }

    fetchNewMovies();
  }, [currentPage, language]);

  return (
    <div className="container-fluid p-2 text-white">

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-light">Loading movies...</p>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="col d-flex justify-content-center">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                currentPage={currentPage}
                totalPage={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
