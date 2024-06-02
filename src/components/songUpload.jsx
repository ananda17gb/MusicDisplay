import { useEffect } from "react";
import { db } from "../../firebaseConfig"; // Import the Firestore instance from your Firebase configuration file
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";

function FetchSongsAndAddToFirestore() {
  useEffect(() => {
    const fetchSongsAndAddToFirestore = async () => {
      try {
        // Get reference to the songs directory in Firebase Storage
        const storage = getStorage();
        const songsRef = ref(storage, "anandamusic");

        // List all items (songs) in the songs directory
        const songItems = await listAll(songsRef);

        // Get existing songs from Firestore
        const songsSnapshot = await getDocs(collection(db, "songs"));
        const existingSongs = songsSnapshot.docs.map((doc) =>
          doc.data().title.toLowerCase().trim()
        );

        // Iterate through each song item
        for (const item of songItems.items) {
          // Get the download URL of the song
          const downloadURL = await getDownloadURL(item);

          // Extract the title from the file name
          const fileName = item.name;
          const title = fileName
            .substring(0, fileName.lastIndexOf("."))
            .toLowerCase()
            .trim(); // Assuming file extension is present

          // Check if the song already exists in Firestore
          if (!existingSongs.includes(title)) {
            // Add the title and URL to Firestore
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
  }, []); // Run once on component mount

  return <></>; // Empty component since this is just a side effect
}

export default FetchSongsAndAddToFirestore;
