"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./movieDetails.module.css";
import { useFavorites } from "@/app/contexts/FavoritesContext";

export default function MovieDetails({
  id,
  title,
  poster,
  date,
  rating,
  voteCount,
  description,
  genres,
  runtime,
  production_companies,
  original_language,
  vote_count,
  release_date,
}) {
 
  const [isFavorite, setIsFavorite] = useState(false);

  const { fetchFavorites } = useFavorites();

  useEffect(() => {

    checkFavorite(id);
  }, []);

 function handelFavoriteToggle() {
    if (isFavorite) {
      deleteFavorite(id);
    } else {
      addFavrite();
    }
  }

 async function deleteFavorite(id) {
  try {
    await fetch(`/api/favorites`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id}),
    });
    setIsFavorite(false);
    fetchFavorites();
    console.log(id);
  } catch (error) {
    console.error("Error deleting favorite:", error);
  }
 }
  async function addFavrite() {
    const formattedReleaseDate = release_date
      ? new Date(release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

    const imageUrl = poster
      ? `https://image.tmdb.org/t/p/w500${poster}`
      : "/images/placeholder-movie-poster.png";
    const newFavorite = {
      id,
      title,
      image: imageUrl,
      rate: voteCount,
      date: formattedReleaseDate,
      numberOfRating: vote_count,
      description: description,
    };

    
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFavorite),
      });

      if (res.ok) {
        setIsFavorite(true);
        fetchFavorites();
        console.log(newFavorite);
      } else {
        console.error("Failed to add favorite");
      }

  }

  async function checkFavorite(id) {
    try {
      const res = await fetch("/api/favorites/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsFavorite(data.exists);
      } else {
        console.error("Failed to check favorite status");
      }
    } catch (err) {
      console.error("Error checking favorite status:", err);
    }
  }


  return (
    <div className={styles.cardWish}>
      <div className={` ${styles.imageContainer}`}>
        <Image
          src={poster}
          alt={title}
          className={styles.poster}
          width={400}
          height={500}
          priority
         
        />
      </div>

      <div className={styles.content}>
        <div className="d-flex justify-between">
          <h2 className={styles.title}>{title}</h2>
          {/* favorite */}
          <FontAwesomeIcon
            icon={faHeart}
            className={
              styles.iconHeart + " " + (isFavorite ? styles.active : "")
            }
            onClick={handelFavoriteToggle}
          />
        </div>

        <p className={styles.date}>{date}</p>

        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={styles.iconStar}
              style={{ color: i < rating ? "black" : "#ccc" }}
            />
          ))}
          <span className={styles.rate}>{Math.floor(voteCount)}</span>
        </div>

        <p className={styles.desc}>{description}</p>
        <div className={styles.buttonContainer}>
          {genres.map((genre) => (
            <button key={genre.id} className={styles.genreButton}>
              {genre.name}
            </button>
          ))}
        </div>
        <div className="d-flex gap-4">
          <p>Duration: {runtime} Min</p>
          {original_language != "no" ? (
            <p>
              Language :{" "}
              {original_language === "en" ? "English" : original_language}
            </p>
          ) : null}
        </div>
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${production_companies[0].logo_path}`}
            alt={production_companies[0].name}
            width={150}
            height={100}
            priority
            className={styles.companyLogo}
          />
          <p className="ms-5 my-4">{production_companies[0].name}</p>
        </div>
      </div>
    </div>
  );
}
