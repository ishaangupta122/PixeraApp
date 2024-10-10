import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
import HomePage from "../pages/Home";

const ImageGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const defaultQuery = "cars and city";
  const apiKey = "qguIWiR0OtGvsm9mX1TsAq5OGac45XyDyPhGLiFoRCuKlduU0BMvqobs";
  const perPage = 24;

  async function fetchImages(page = 1, searchQuery = query, append = false) {
    try {
      const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&page=${page}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (append) {
        setData((prevData) => [...prevData, ...response.data.photos]);
      } else {
        setData(response.data.photos);
      }

      setLoading(false);
      setError(false);
      if (response.data.photos.length < perPage) {
        setHasMore(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(`Cannot fetch ${err}`);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    fetchImages(1, query || defaultQuery);
  };

  useEffect(() => {
    if (page > 1) {
      fetchImages(page, query || defaultQuery, true);
    }
  }, [page]);

  useEffect(() => {
    fetchImages(1, defaultQuery);
  }, []);

  // Set up the observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);

  return (
    <>
      <HomePage query={query} setQuery={setQuery} handleSearch={handleSearch} />

      {loading && (
        <div className="w-full h-[70vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-solid border-r-transparent"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full h-[50vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl text-red-600 font-bold">
              Error Fetching Data !!!
            </span>
          </div>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="sm:px-16 px-5 flex justify-center w-full">
          <div
            className="max-w-[2000px] sm:columns-2 md:columns-3 2xl:columns-4 w-full"
            style={{ columnGap: "15px" }}
          >
            <ImageCard fetchedImages={data} />
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="w-full h-[50vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl text-gray-800">No Images Found</span>
          </div>
        </div>
      )}

      {/* Empty div as an observer target */}
      <div ref={observerRef} className="h-10"></div>
    </>
  );
};

export default ImageGallery;
