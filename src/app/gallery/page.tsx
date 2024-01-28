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
      <div className={styles.bgtint}></div>
      <h1 className={styles.title}>Your Memory Gallery</h1>
      <section className={styles.galleryWrapper}>
        <div className={styles.gallery}>
          {extendedEntries.map((entry) => {
            if (entry.media.isVideo) {
              return (
                <div key={entry.id} className={styles.galleryItem}>
                  <div className={styles.mediaCenterer}>
                    <div className={styles.mediaWrapper}>
                      <CldVideoPlayer
                        src={entry.media.publicId}
                        width={190}
                        height={190}
                      />
                    </div>
                  </div>
                  <p className={styles.galleryItemInfo}>{entry.caption}</p>
                  <p className={styles.galleryItemDate}>
                    {new Date(entry.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={entry.id} className={styles.galleryItem}>
                  <div className={styles.mediaCenterer}>
                    <div className={styles.mediaWrapper}>
                      <CldImage
                        src={entry.media.publicId}
                        alt={entry.caption}
                        className={styles.galleryImg}
                        width={210}
                        height={210}
                        crop="fill"
                      />
                    </div>
                  </div>
                  <p className={styles.galleryItemInfo}>{entry.caption}</p>
                  <p className={styles.galleryItemDate}>
                    {new Date(entry.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </section>
    </main>
  );
}
