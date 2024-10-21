import React, { useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import LazyLoad from "react-lazyload";

const VideoCard = ({ fetchedVideos = [] }) => {
  const [preview, setPreview] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  // Array of refs to manage multiple video elements
  const videoRefs = useRef([]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "";
  }

  function onVideoClick(item) {
    setSelectedVideo(item);
    setPreview(true);
  }

  const downloadVideo = async (url, videoName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = videoName;
      link.click();
    } catch (error) {
      alert("Error downloading the video:", error);
    }
  };

  return (
    <>
      {fetchedVideos.map((item, index) => (
        <div
          className="relative sm:h-[65vh] h-[45vh] max-h-[450px] rounded-md overflow-hidden shadow-lg shadow-black/55 transition-transform duration-300 transform hover:scale-[1.01] cursor-pointer"
          onMouseEnter={() => {
            setIsHovered(item.id);
            if (videoRefs.current[index]) {
              videoRefs.current[index].play();
            }
          }}
          onMouseLeave={() => {
            setIsHovered(null);
            if (videoRefs.current[index]) {
              videoRefs.current[index].pause();
            }
          }}
          onClick={() => onVideoClick(item)}
          key={item.id}
        >
          <div className="relative top-0 left-0 bg-transparent h-full w-full">
            <div className="absolute m-4 flex justify-center items-center h-[35px] w-[35px] z-40 bg-black/50 rounded-full">
              <span className="fa-solid fa-circle-play text-xl text-white" />
            </div>
            <LazyLoad className="h-[75vh] w-100%" offset={100}>
              <video
                className="object-cover h-full w-full"
                loop
                muted
                preload="auto"
                ref={(el) => (videoRefs.current[index] = el)}
              >
                <source src={item.video_files[0].link} type="video/mp4" />
              </video>
            </LazyLoad>
          </div>
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
              isHovered === item.id ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-end justify-between h-full p-5">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-start w-full">
                  <img
                    src="./user.png"
                    className="h-[35px] rounded-full mr-2"
                    alt="User"
                  />
                  <span
                    className="text-white font-semibold text-xl font-mono"
                    style={{
                      wordSpacing: "-5px",
                    }}
                  >
                    {truncateText(item.user.name, 10)}
                    <span className="text-sm">...</span>
                  </span>
                </div>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadVideo(
                      item.video_files[0].link,
                      `video-${item.id}.mp4`
                    );
                  }}
                  download
                  className="bg-cyan-100 hover:bg-cyan-200 text-black/80 text-md font-semibold py-2 px-4 rounded-3xl flex items-center justify-center transition-colors duration-300"
                >
                  <span className="fa-solid fa-download sm:mr-2 mt-[2px]"></span>
                  <span className="sm:block hidden">Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {preview && (
        <VideoPreview
          video={selectedVideo}
          downloadVideo={downloadVideo}
          onClose={() => setPreview(false)}
        />
      )}
    </>
  );
};

export default VideoCard;
