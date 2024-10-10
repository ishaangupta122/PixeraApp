import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import VideoPage from "../pages/Video";

const VideoGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const apiKey = "qguIWiR0OtGvsm9mX1TsAq5OGac45XyDyPhGLiFoRCuKlduU0BMvqobs";
  const perPage = 24;
  const defaultQuery = "mountains";

  async function fetchedVideos(page = 1, searchQuery = query, append = false) {
    try {
      const apiUrl = `https://api.pexels.com/videos/search?query=${searchQuery}&per_page=${perPage}&page=${page}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (append) {
        setData((prevData) => [...prevData, ...response.data.videos]);
      } else {
        setData(response.data.videos);
      }

      console.log(response.data.videos);
      setLoading(false);
      setError(false);
      setLoadMore(false);
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
    fetchedVideos(1, query || defaultQuery);
  };

  const loadMoreVideos = () => {
    const nextPage = page + 1;
    setLoadMore(true);
    setPage(nextPage);
  };

  useEffect(() => {
    if (page > 1) {
      fetchedVideos(page, query || defaultQuery, true);
    }
  }, [page]);

  useEffect(() => {
    fetchedVideos(1, defaultQuery);
  }, []);

  return (
    <>
      <VideoPage
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {loading && (
        <div className="w-full h-[70vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-solid border-r-transparent"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full h-[80vh] relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl text-red-600 font-bold">
              Error Fetching Data !!!
            </span>
          </div>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="sm:px-16 px-5  flex justify-center w-full">
          <div className="w-full max-w-[2000px] grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            <VideoCard fetchedVideos={data} />
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="w-full h-[50vh] relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl text-gray-800">No Videos Found</span>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center flex-col my-10 pb-10 gap-10">
        <button
          className="bg-black text-white rounded-md px-6 py-3 hover:bg-black/90 hover:shadow-lg hover:shadow-black/40"
          onClick={loadMoreVideos}
          disabled={loadMore}
        >
          <span className="font-semibold">
            {loadMore ? "Loading..." : "Load More"}
          </span>
        </button>
        {loadMore && (
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-solid border-r-transparent"></div>
        )}
      </div>
    </>
  );
};

export default VideoGallery;
