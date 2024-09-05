import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { fetch } from "./services/ApiRequest";

function App() {
  const [link, setLink] = useState("");
  const [id, setId] = useState(null);
  const [respone, setRespone] = useState(null);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchData = () => {
        let interval = setInterval(async function () {
          const res = await fetch(id);
          if (res.status === "200" && res.data.status === "ok") {
            setDisabled(false);
            setRespone(res.data);
            clearInterval(interval);
          }
        }, 1000);
      };
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (respone) {
      window.location.href = respone.link;
    }
  }, [respone]);

  function extractValueFromQuery(query) {
    const parameter = "v";
    const urlParams = new URLSearchParams(query);
    const extractedId = urlParams.get(parameter);

    if (extractedId) {
      setId(extractedId); // Update state with extracted ID // Clear any previous error message
    } else {
      console.log(
        'Invalid YouTube link. Please enter a valid link with parameter "v".'
      );
      // Set error message for invalid links
    }
  }

  return (
    <div className="App">
      {/* logo */}
      <div id="logo">
        <img src="https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg" />
        <h2>MP3 DOWNLOADER</h2>
      </div>

      {/* body */}
      <div id="body">
        {/* Input */}
        <input
          placeholder="Youtube link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          type="text"
        />
        <span>It might take a moment to convert to video</span>
      </div>
      <button
       onClick={() => extractValueFromQuery(link)}
       disabled={disabled}
       className={disabled ? 'btn-disabled' : ''}
       >Download</button>
    </div>
  );
}

export default App;
