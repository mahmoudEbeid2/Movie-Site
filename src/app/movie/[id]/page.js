import React from "react";
import { getMovieDetailsByID } from "@/app/api/themoviedbApi";
import styles from "./movieDetails.module.css";
import MovieDetails from "./movieDetails";
import { useLanguage } from "@/app/contexts/LanguageContext";
import MovieCard from "@/components/MovieCard/MovieCard";

export async function generateMetadata({ params }) {
  let movie = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&api_key=${process.env.API_KEY}`
  );

  movie = await movie.json();
  return {
    title: movie.title,
    description: movie.overview,
  };
}
async function MovieDetailsPage({ params }) {
  const { id } = await params;

  const movie = await getMovieDetailsByID(id);
  console.log(movie);

  const {
    title,
    overview,
    genres,
    vote_average,
    credits,
    videos,
    recommendations,
    similar,
    production_companies,
    poster_path,
    budget,
    release_date,
    runtime,
    revenue,
    vote_count,
    original_language,
  } = movie;

  return (
    <div className="container  py-5">
      <h2 className="fw-600 mb-4">deatiles List</h2>
      <div className={styles.grid}>
        <MovieDetails
          key={id}
          id={id}
          title={title}
          poster={`https://image.tmdb.org/t/p/w500${poster_path}`}
          date={release_date}
          rating={Math.round(vote_average / 2)}
          voteCount={vote_average}
          description={overview}
          genres={genres}
          production_companies={production_companies}
          runtime={runtime}
          original_language={original_language}
          vote_count={vote_count}
          release_date={release_date}
        />
      </div>
      <h2 className="fw-600 mb-4">Recommendations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {recommendations.results.splice(0, 12).map((movie) => (
          <div key={movie.id} className="col d-flex justify-content-center">
            <MovieCard movie={movie} useFav={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
