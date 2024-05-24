import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";

function MusicPlayer() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="fixed bottom-0 w-6/12">
          <div className="bg-gray-100  flex gap-10 p-4">
            <button>
              <FaBackwardStep />
            </button>
            <button>
              <FaPlay />
            </button>
            {/* <button>
              <FaPause />
            </button> */}
            <button>
              <FaForwardStep />
            </button>
            <div className="flex justify-evenly gap-10">
              <h1>Song Timeline</h1>
              <h1>Song Title</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
