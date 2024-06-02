import MusicCard from "./musiccard";
import PropTypes from "prop-types";

function Content({ songs, playSong, isPlaying, currentSongIndex }) {
  return (
    <>
      <div className="max-h-[calc(100vh - 150px)] overflow-y-auto pb-28">
        {songs.map((item, index) => (
          <div key={item.id}>
            <MusicCard
              title={item.title}
              url={item.url}
              onPlay={() => playSong(index)}
              isPlaying={isPlaying && currentSongIndex === index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

Content.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  playSong: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentSongIndex: PropTypes.number,
};

export default Content;
