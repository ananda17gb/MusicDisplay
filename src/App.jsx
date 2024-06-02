import Header from "./components/header";
import Content from "./components/content";
import MusicPlayer from "./components/musicplayer";
import SongUpload from "./components/songUpload";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
// import { storage } from "../firebaseConfig";

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
      } catch (error) {
        console.error("Error fetching songs: ", error);
      }
    };
    fetchData();
  }, []);

  const playSong = (index) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying); // Toggle play/pause if the same song is clicked again
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true); // Play the selected song
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true); // Play the next song
  };

  const prevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true); // Play the previous song
  };

  return (
    <>
      <Header />
      <SongUpload /> {/* Render the upload form component */}
      <Content
        songs={songs}
        playSong={playSong}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
      />
      <MusicPlayer
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        songs={songs}
        nextSong={nextSong}
        prevSong={prevSong}
        setIsPlaying={setIsPlaying}
      />
    </>
  );
}

export default App;
