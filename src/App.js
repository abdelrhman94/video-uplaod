import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [videoUpload, setVideoUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);

  const videosListRef = ref(storage, "videos/");

  const uploadFile = () => {
    
    setLoading(true);
    if (videoUpload == null) return;
    const imageRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    uploadBytes(imageRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoUrls((prev) => [...prev, url]);
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    listAll(videosListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="file"
          onChange={(event) => {
            setVideoUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile} disabled={loading}>
          Upload Video
        </button>
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {videoUrls.map((url) => {
          return (
            <div key={url.id}>
              <video width="320" height="240" controls>
                <source src={url} type="video/mp4" />
              </video>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
