import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect } from "react";
import { db, storage } from "../../firebaseConfig"; // Import the Firestore instance from your Firebase configuration file

function FetchSongsAndAddToFirestore() {
  useEffect(() => {
    const fetchSongsAndAddToFirestore = async () => {
      try {
        const songsRef = ref(storage, "anandamusic");
        const songItems = await listAll(songsRef);
        const songsSnapshot = await getDocs(collection(db, "songs"));
        const existingSongs = songsSnapshot.docs.map((doc) =>
          doc.data().title.toLowerCase().trim()
        );

        for (const item of songItems.items) {
          const downloadURL = await getDownloadURL(item);

          const fileName = item.name;
          const title = fileName
            .substring(0, fileName.lastIndexOf("."))
            .toLowerCase()
            .trim();
          if (!existingSongs.includes(title)) {
            await addDoc(collection(db, "songs"), {
              title: title,
              url: downloadURL,
            });
          }
        }

        console.log("Songs fetched and added to Firestore successfully!");
      } catch (error) {
        console.error("Error fetching songs and adding to Firestore:", error);
      }
    };

    fetchSongsAndAddToFirestore();
  }, []);
  return <></>;
}

export default FetchSongsAndAddToFirestore;
