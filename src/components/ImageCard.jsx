import React, { useState } from "react";
import ImagePreview from "./ImagePreview";

const ImageCard = ({ fetchedImages = [] }) => {
  const [preview, setPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "";
  }

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setPreview(true);
  };

  const downloadImage = async (url, imageName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = imageName;
      link.click();
    } catch (error) {
      alert("Error downloading the image:", error);
    }
  };

  return (
    <>
      {fetchedImages.map((item) => (
        <div
          className="inline-block w-full mb-[15px] relative rounded-md overflow-hidden shadow-lg shadow-black/55 transition-transform duration-300 transform hover:scale-[1.01] cursor-pointer"
          onMouseEnter={() => setIsHovered(item.id)}
          onMouseLeave={() => setIsHovered(null)}
          onClick={() => handleImageClick(item)}
          key={item.id}
        >
          <img
            src={item.src.large2x}
            alt={item.alt}
            className="w-full block object-cover"
          />
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
                  />
                  <span
                    className="text-white font-semibold text-xl font-mono"
                    style={{
                      wordSpacing: "-6px",
                    }}
                  >
                    {truncateText(item.photographer, 10)}
                    <span className="text-sm">...</span>
                  </span>
                </div>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(item.src.large2x, `image-${item.id}.jpg`);
                  }}
                  className="bg-cyan-100 hover:bg-cyan-200 text-black/80 text-md font-semibold py-2 px-4 rounded-3xl flex items-center justify-center transition-colors duration-300"
                >
                  <span className="fa-solid fa-download sm:mr-2 mt-[2px]"></span>
                  <span className="md:block hidden">Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {preview && (
        <ImagePreview
          image={selectedImage}
          downloadImage={downloadImage}
          onClose={() => setPreview(false)}
        />
      )}
    </>
  );
};

export default ImageCard;
