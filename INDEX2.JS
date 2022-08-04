import Head from "next/head";
import { useState } from "react";
import React, {useEffect} from "react";
import { emojiCursor } from "cursor-effects";
import styles from "../styles/Home.module.css";
import { rainbowCursor } from "cursor-effects";
import  { Dalle } from 'dalle-node';
export default function Home() {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    new rainbowCursor({length: 3, colors: ['red', 'blue'], size: 4});
  });

  async function getDallee() {
    setError(false);
    setLoading(true);
    
    const dalle = new Dalle(`${token}`);
    const generations = await dalle.generate(`${query}`);
    console.log(generations)
    setResults(generations)
    setLoading(false)

  }

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
        console.log(data.result.generations.image_path)
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
        <title>Create DALLE 2 App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create images with <span className={styles.titleColor}>DALLE 2</span>
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
          <button className={styles} onClick={getDallee}>Get 4 Images</button>
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
}
