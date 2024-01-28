"use client";

import { useEffect, useState } from "react";
import { ExtendedEntry, type Entry } from "@/lib/schema";
import styles from "./page.module.css";
import { CldVideoPlayer, CldImage } from "next-cloudinary";
import axios from "axios";

export default function Gallery() {
  const [extendedEntries, setExtendedEntries] = useState<ExtendedEntry[]>([]);

  useEffect(() => {
    axios.get("/api/extendedEntries").then((res) => {
      setExtendedEntries(res.data);
    });
  }, []);

  return (
    <main>
      <h1 className={styles.title}>ECHO</h1>
      <h5 className={styles.description}>Welcome to your harbour...</h5>
      <section className={styles.galleryWrapper}>
        <div className={styles.gallery}>
          {extendedEntries.map((entry) => {
            if (entry.media.isVideo) {
              return (
                <div key={entry.id} className={styles.galleryItem}>
                  <CldVideoPlayer
                    src={entry.media.publicId}
                    width={280}
                    height={400}
                  />
                  <p className={styles.galleryItemInfo}>{entry.caption}</p>
                </div>
              );
            } else {
              return (
                <div key={entry.id} className={styles.galleryItem}>
                  <CldImage
                    src={entry.media.publicId}
                    alt={entry.caption}
                    className={styles.galleryImg}
                    width={280}
                    height={400}
                  />
                  <p className={styles.galleryItemInfo}>{entry.caption}</p>
                </div>
              );
            }
          })}
        </div>
      </section>
    </main>
  );
}
