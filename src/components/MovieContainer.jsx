"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getNowPlayingMovies } from "@/app/api/themoviedbApi";
import PaginationComponent from "@/components/Pagination/Pagination";
import MovieCard from "@/components/MovieCard/MovieCard"; // Import the MovieCard component

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
    <div className="container-fluid px-2 py-5 text-white">
      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-light">Loading movies...</p>
        </div>
      ) : (
        <>
          <div
            className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 row-cols-xl-5
                          g-3 g-md-4 g-lg-4 mb-5 justify-content-center"
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
