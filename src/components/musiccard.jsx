import { FaPlay } from "react-icons/fa6";

function MusicCard() {
  return (
    <>
      <div className="flex justify-center items-center mt-20">
        <div className="bg-gray-200 w-6/12 flex gap-10 p-6">
          <button>
            <FaPlay />
          </button>
          <h1 className="grid">Song Title</h1>
        </div>
      </div>
    </>
  );
}

export default MusicCard;
