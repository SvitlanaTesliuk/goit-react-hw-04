import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageCard key={image.id}
         image={image} 
         onClick={onImageClick} 
         className={styles.image}/>
      ))}
    </ul>
  );
};

export default ImageGallery;