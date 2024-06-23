import PropTypes from "prop-types";
import { useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function MusicCard({ title, onPlay, isPlaying }) {
  useEffect(() => {}, [isPlaying]);

  return (
    <div className="flex justify-center items-center my-20">
      <div className="bg-gray-400 w-6/12 flex gap-10 p-6">
        <button onClick={onPlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
        <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full">
          {title}
        </h1>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  title: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default MusicCard;
