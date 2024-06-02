import { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import PropTypes from "prop-types";

function MusicCard({ title, url, onPlay, isPlaying }) {
  useEffect(() => {
    // This effect runs when the playing state of the song changes
  }, [isPlaying]);

  return (
    <div className="flex justify-center items-center mt-20 z-[1]">
      <div className="bg-gray-200 w-6/12 flex gap-10 p-6">
        <button onClick={onPlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
        <h1 className="grid">{title}</h1>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default MusicCard;
