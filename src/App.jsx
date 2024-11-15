import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);

  const accessKey = "C4kY6VQ5P4PHGomPk1R0RCn2uh0et6u8dwP9yVl67JA"; 

  const fetchImages = async (newQuery, newPage = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: newQuery, page: newPage, per_page: 12 },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      const fetchedImages = response.data.results;
      setImages((prevImages) =>
        newPage === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
      );
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    setQuery(newQuery);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />
      {error ? ( 
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={setModalData} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
      {modalData && (
        <ImageModal image={modalData} onClose={() => setModalData(null)} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
