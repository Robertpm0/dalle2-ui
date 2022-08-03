import Head from 'next/head';

import styles from '../styles/home.module.css';
import { useState } from 'react';
import { emojiCursor } from 'cursor-effects';

export default function Home() {

  

  new emojiCursor({ emoji: ["🔥", "🐬", "🦆"] });
  
  const [token, setToken] = useState("");
      const [query, setQuery] = useState("");
      const [results, setResults] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
    
      function getDalle2() {
        setError(false);
        setLoading(true);
        fetch(`/api/dalle2?k=${token}&q=${query}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setResults(data.result);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setError(true);
          });
      }
    
      return (
        <div className={styles.container}>
          <Head>
            <title>DaLLe-2 App</title>
          </Head>
    
          <main className={styles.main}>
            <h1 className={styles.title}>
              Create images with <span className={"titleColor"}>DALLE 2</span>
            </h1>
            <p className={styles.description}>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Bearer Token"
              />{" "}
              &{" "}
              <input
                id="query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Query"
              />
              <button onClick={getDalle2}>Get 4 Images</button>
            </p>{" "}
            {error ? (
              <div className={styles.error}>Something went wrong. .Try again</div>
            ) : (
              <></>
            )}{" "}
            {loading && <p>Loading...</p>}
            <div className={styles.grid}>
              {results.map((result) => {
                return (
                  <div className={styles.card}>
                    <img
                      className={styles.imgPreview}
                      src={result.generation.image_path}
                    />
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      );
  
};
