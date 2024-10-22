import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
} from "react-icons/fa6";

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedHrs = hrs > 0 ? `${hrs}:` : "";
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  return `${formattedHrs}${formattedMins}:${formattedSecs}`;
}

function MusicPlayerCard({
  currentSongIndex,
  songs,
  isPlaying,
  nextSong,
  prevSong,
  setIsPlaying,
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSongIndex !== null && audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleEnded = () => {
      nextSong();
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
      return () => {
        audioRef.current.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSongIndex, nextSong]);

  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = duration * (e.target.value / 100);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const currentImage =
    currentSongIndex !== null && songs[currentSongIndex].image
      ? songs[currentSongIndex].image
      : ""; // Fallback image

  return (
    <>
      <div className="flex justify-center items-center h-screen relative">
        <div className="flex flex-col items-center -mt-60 max-sm:w-[280px]">
          <div className="z-30 relative top-32 md:top-48 mb-4">
            <img
              src={currentImage}
              className="rounded-3xl shadow-custom w-[500px]"
            />
          </div>

          <div className="w-[600px] max-sm:w-80 max-sm:h-[450px] h-[500px] bg-[#f2eded] rounded-3xl z-10 relative">
            <div className="absolute bottom-0 w-full">
              <div className="bg-[#f2eded] flex flex-col rounded-3xl gap-4 p-4">
                <div className="flex justify-center gap-10 py-4 md:py-10">
                  {currentSongIndex !== null ? (
                    <h1 className="text-xl text-[#58585A] capitalize">
                      {songs[currentSongIndex].title}
                    </h1>
                  ) : (
                    <h1></h1>
                  )}
                </div>
                <div className="flex justify-center flex-col items-center">
                  <div className="flex justify-between w-full h-10">
                    <p className="text-[#4C5362] text-sm">{`${formatTime(
                      currentTime
                    )}`}</p>
                    <p className="text-[#4C5362] text-sm">{`${formatTime(
                      duration
                    )}`}</p>
                  </div>
                  <input
                    type="range"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleProgressChange}
                    className="w-full text-[#4C5362]"
                  />
                </div>
                <audio
                  ref={audioRef}
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  style={{ display: "none" }}
                >
                  <source type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="flex justify-center gap-14 md:gap-20 h-20">
                  <button
                    onClick={prevSong}
                    className="flex justify-center items-center w-8 px-2 md:w-14 md:px-4 hover:bg-gray-300"
                  >
                    <FaBackwardStep color="#4C5362" size="xl" />
                  </button>
                  <button
                    onClick={playPause}
                    className="flex justify-center items-center w-10 px-2 md:w-16 md:px-4 hover:bg-gray-300"
                  >
                    {isPlaying ? (
                      <FaPause color="#4C5362" size="xl" />
                    ) : (
                      <FaPlay color="#4C5362" size="xl" />
                    )}
                  </button>
                  <button
                    onClick={nextSong}
                    className="flex justify-center items-center w-8 px-2 md:w-14 md:px-4 hover:bg-gray-300"
                  >
                    <FaForwardStep color="#4C5362" size="xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MusicPlayerCard.propTypes = {
  currentSongIndex: PropTypes.number,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string, // Add this line for the image field
    })
  ).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  nextSong: PropTypes.func.isRequired,
  prevSong: PropTypes.func.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default MusicPlayerCard;
