import React from "react";
import styles from "./ImageCard.module.css"

const ImageCard = ({ image, onClick }) => {
  const { urls, alt_description } = image;

  return (
    <li className={styles.imageItem} onClick={() => onClick(image)}>
      <img className={styles.image} src={urls.small} alt={alt_description} />
    </li>
  );
};

export default ImageCard;