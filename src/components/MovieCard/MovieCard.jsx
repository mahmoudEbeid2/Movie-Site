"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.css";

const getRatingColor = (score) => {
  if (score >= 70) return "#4CAF50";
  if (score >= 50) return "#FFC107";
  return "#F44336";
};

export default function MovieCard({ movie }) {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const rating = Math.round(vote_average * 10);
  const ratingColor = getRatingColor(rating);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formattedReleaseDate = release_date
    ? new Date(release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/images/placeholder-movie-poster.png";

  return (
    <Link href={`/movie/${id}`} passHref className="text-decoration-none">
      <div className="card h-100 border-0 shadow text-white position-relative movie-card">
        <div
          className="position-relative overflow-hidden bg-secondary rounded"
          //   style={{ paddingTop: "150%" }}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={700}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit-cover rounded w-100 h-auto"
          />

          <div
            className="position-absolute top-0 end-0 m-2 bg-white bg-opacity-50 rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "32px", height: "32px", zIndex: 10 }}
          >
            <span className="text-white lh-1 fw-bold">&#x22EF;</span>
          </div>
        </div>

        <div className="card-body p-3 position-relative pb-3 pt-5">
          <div
            className={styles.ratingCircle}
            style={{
              backgroundImage: `conic-gradient(${ratingColor} ${rating}%, #4a4a4a ${rating}%)`,
            }}
          >
            <div className={styles.innerCircle}>
              <span className="fs-6 fw-bold text-white">{rating}%</span>
            </div>
          </div>

          <div className="d-flex justify-content-between justify-content-center align-items-center">
            <div>
              <h5 className="card-title fw-bold fs-6 mt-1 mb-1 text-dark lh-sm">
                {title}
              </h5>
              <p className="card-text text-secondary fs-7">
                {formattedReleaseDate}
              </p>
            </div>

            <div
              className="position-absolute bottom-0 end-0 m-3 movie-card-favorite-hover cursor-pointer"
              onClick={handleFavoriteToggle}
              style={{ zIndex: 150 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFavorite ? "#FFD700" : "none"}
                stroke={isFavorite ? "#FFD700" : "#d1d5db"}
                strokeWidth="1.5"
                className="d-block"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.835 3 8.25c0 7.219 2.912 11.455 9 16.062 6.088-4.607 9-8.843 9-16.062z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
