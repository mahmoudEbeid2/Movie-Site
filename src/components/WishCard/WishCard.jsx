import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./wishCard.module.css";

export default function WishCard({
  id,
  title,
  poster,
  date,
  rating,
  voteCount,
  description,
  handleDelete,
}) {
  return (
    <div className={styles.cardWish}>
      <div className={styles.imageContainer}>
        <Image
          src={poster}
          alt={title}
          className={styles.poster}
          width={194}
          height={289}
        />
      </div>

      <div className={styles.content}>
        <div className="d-flex justify-between">
          <h2 className={styles.title}>{title}</h2>
          <FontAwesomeIcon
            icon={faHeart}
            className={styles.iconHeart}
            onClick={() => handleDelete(id)}
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
          <span className={styles.rate}>{voteCount}</span>
        </div>

        <p className={styles.desc}>
          {description.length > 100
            ? description.slice(0, 150) + "..."
            : description}
        </p>
      </div>
    </div>
  );
}
