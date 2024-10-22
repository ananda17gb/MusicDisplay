import SongUpload from "./components/songUpload";
import MusicPlayerCard from "./components/musicPlayerCard";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongs(songsList);

        if (songsList.length > 0) {
          setCurrentSongIndex(0);
          setIsPlaying(false); // Start playing the first song immediately
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const playSong = (index) => {
  //   if (currentSongIndex === index) {
  //     setIsPlaying(!isPlaying);
  //   } else {
  //     setCurrentSongIndex(index);
  //     setIsPlaying(true);
  //   }
  // };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true);
  };

  return (
    <>
      <SongUpload />
      <div
        style={{
          backgroundImage: `url("${songs[currentSongIndex]?.image || ""}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative bg-[#000000] bg-opacity-80 backdrop-blur-xl">
          <MusicPlayerCard
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            songs={songs}
            nextSong={nextSong}
            prevSong={prevSong}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>

      {/* <Content
        songs={songs}
        playSong={playSong}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
      />
       */}
    </>
  );
}

export default App;
