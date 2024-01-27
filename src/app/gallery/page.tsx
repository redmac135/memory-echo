"use client";

import { useEffect, useState } from "react";
import {type Entry} from "@/lib/schema";
import styles from "./page.module.css";
import { CldVideoPlayer, CldImage } from "next-cloudinary";
import axios from "axios";

export default function Gallery() {
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        // add axios call here
        setLoading(false);
        setEntries([]);

        axios.get("/api/entries").then((res) => {
            setEntries(res.data);
        })
    }, [])

    return (
        <main>
            <h1 className={styles.title}>ECHO</h1>
            <h5 className={styles.description}>Welcome to your harbour...</h5>
            <section className={styles.galleryWrapper}>
                <div className={styles.gallery}>
                    {entries.map((entry) => {
                        if (entry.isVideo) {
                            return (
                                <div key={entry.id} className={styles.galleryItem}>
                                    <CldVideoPlayer src={entry.image} width={280} height={400} />
                                    <p className={styles.galleryItemInfo}>{entry.caption}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={entry.id} className={styles.galleryItem}>
                                    <CldImage src={entry.image} alt={entry.caption} className={styles.galleryImg} width={280} height={400} />
                                    <p className={styles.galleryItemInfo}>{entry.caption}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </section>
        </main>
    )
}