import React, { useState } from "react";
import { FaShare, FaTimes } from "react-icons/fa";

const VideoPreview = ({ video, onClose, downloadVideo }) => {
  if (!video) return null;

  return (
    <>
      <div className="z-50 h-full w-full fixed left-1/2 top-1/2 bg-black/70 -translate-x-1/2 -translate-y-1/2">
        <div className="shadow-xl bg-white w-[88vw] h-[90vh] max-w-[800px] max-h-[650px] rounded-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-cyan-200 shadow-md h-[70px] w-full rounded-t-2xl mt-[-2px]">
            <div className="container flex items-center justify-between px-8 h-full gap-2 overflow-hidden">
              <span className="text-lg font-bold sm:text-xl sm:block hidden">
                Download For Free
              </span>
              <div className="flex items-center sm:justify-end justify-between w-full sm:w-fit space-x-4 h-[40px]">
                <div className="flex items-center space-x-4 h-[40px]">
                  {/* <a
                    className="flex items-center justify-center hover:bg-gray-900 transition bg-black text-white rounded-lg px-4 h-full font-semibold"
                    href={`${video.video_files[0].link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hidden md:block">
                      Open in New Tab &nbsp;
                    </span>
                    <FaShare />
                  </a> */}
                  <a
                    className="cursor-pointer flex items-center justify-center hover:bg-gray-900 transition bg-black text-white rounded-lg px-4 h-full font-semibold"
                    onClick={() => {
                      downloadVideo(
                        video.video_files[0].link,
                        `video-${video.id}.mp4`
                      );
                    }}
                  >
                    <span className="hidden md:block">Download &nbsp;</span>
                    <span className="fa-solid fa-download"></span>
                  </a>
                </div>
                <button
                  className="bg-black text-white rounded-lg px-4 h-full font-semibold hover:bg-gray-900 transition"
                  onClick={onClose}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          <div className="h-[75%] w-[80%] max-w-[600px] flex justify-center items-center absolute left-1/2 top-[55%] mt-2 -translate-x-1/2 -translate-y-1/2 ">
            <video
              className="object-cover h-full w-full rounded-md shadow-md shadow-black "
              src={video.video_files[0].link}
              controls
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPreview;
