import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
  FaVolumeHigh,
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

function MusicPlayer({
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
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleVolume = () => {
    setShowVolume(!showVolume);
  };

  return (
    <div className="flex justify-center items-center fixed bottom-0 w-full z-10">
      <div className="fixed bottom-0 w-full">
        <div className="bg-gray-100 grid grid-cols-6 grid-rows-3 gap-2 p-4 items-center">
          <div className="flex justify-evenly gap-10 col-span-6">
            {currentSongIndex !== null && (
              <h1 className="text-xl">{songs[currentSongIndex].title}</h1>
            )}
          </div>
          <div className="flex justify-evenly col-start-2 col-span-4 gap-4">
            <button
              onClick={prevSong}
              className="flex justify-center items-center"
            >
              <FaBackwardStep />
            </button>
            <button
              onClick={playPause}
              className="flex justify-center items-center"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={nextSong}
              className="flex justify-center items-center"
            >
              <FaForwardStep />
            </button>
          </div>
          <div className="gap-2 col-span-4 col-start-2 row-start-3">
            <div className="flex justify-center items-center gap-4">
              <input
                type="range"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleProgressChange}
                className="w-full"
              />
              <span>{`${formatTime(currentTime)}/${formatTime(
                duration
              )}`}</span>
            </div>
          </div>
          <button
            className="hidden md:block lg:hidden row-start-3 col-start-6"
            onClick={toggleVolume}
          >
            <div className="flex justify-center">
              <FaVolumeHigh />
            </div>
          </button>
          {showVolume && (
            <div className="hidden md:block col-start-6 row-start-2">
              <div className="flex gap-2 justify-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-32"
                />
              </div>
            </div>
          )}
          <div className="hidden md:hidden lg:block xl:block col-start-6 row-start-2">
            <div className="flex gap-2 justify-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32"
              />
            </div>
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
        </div>
      </div>
    </div>
  );
}

MusicPlayer.propTypes = {
  currentSongIndex: PropTypes.number,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  nextSong: PropTypes.func.isRequired,
  prevSong: PropTypes.func.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
};

export default MusicPlayer;
