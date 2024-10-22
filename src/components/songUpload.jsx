import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect } from "react";
import { db, storage } from "../../firebaseConfig";

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
            const imageRef = ref(storage, `anandamusic/images/${title}.gif`);
            const imageURL = await getDownloadURL(imageRef).catch(
              () => "/subway.png"
            );
            await addDoc(collection(db, "songs"), {
              title: title,
              url: downloadURL,
              image: imageURL,
            });
          }
          console.log(title);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongsAndAddToFirestore();
  }, []);
  return <></>;
}

export default FetchSongsAndAddToFirestore;
