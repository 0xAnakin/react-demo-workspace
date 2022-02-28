import { useState, useEffect } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import "./App.css";

function App() {

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const WC_KEY = 42150;
  const SITE_ID = 20123;
  const headers = new Headers();

  headers.set("Authorization", `Basic ${base64_encode("test@liferay.com:test")}`);

  useEffect(() => {

    fetch(`http://localhost:8080/o/headless-delivery/v1.0/sites/${SITE_ID}/structured-contents/by-key/${WC_KEY}`, {
      method: "GET",
      headers: headers
    }).then(res => res.json()).then((result) => {
      setData(result);
    }).catch((err) => {
      setError(err);
    })

  }, [])

  if (!error && !data) {
    return (
      <div>Loading...</div>
    )
  } else if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  } else {
    return (
      <div className="custom-user-container">
        <h1 class="user-full-name">
          <span class="user-first-name">{data.contentFields[0].contentFieldValue.data}</span>&nbsp;
          <span class="user-last-name">{data.contentFields[1].contentFieldValue.data}</span>
        </h1>
        <img src={data.contentFields[2].contentFieldValue.image.contentUrl} />
      </div>
    )
  }

}

export default App;