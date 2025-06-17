import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./wishCard.module.css";

export default function WishCard() {
  return (
    
    <div className={styles.cardWish}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/wishImge.jpg"
          alt="Black Widow Poster"
          width={100}
          height={140}
          className={styles.poster}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Black Widow</h2>
          <FontAwesomeIcon icon={faHeart} className={styles.iconHeart} />
        </div>

        <p className={styles.date}>Sep 25, 2017</p>

        <div className={styles.rating}>
          <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
          <FontAwesomeIcon icon={faStar}  className={styles.iconStar} />
          <FontAwesomeIcon icon={faStar} className={styles.iconStar}/>
          <FontAwesomeIcon icon={faStar} className={styles.iconStar}/>
          <FontAwesomeIcon icon={faStar}  style={{ color: "#ccc" ,width:"20px"}} />
          <span className={styles.rate}>9288</span>
        </div>

        <p className={styles.desc}>
          Natasha Romanoff, also known as Black Widow, confronts the darker
          parts of her ledger when a dangerous conspiracy with ties to her past
          arises. Pursued by....
        </p>
      </div>
    </div>
  );
}
