"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {type Entry} from "@/lib/schema";
import styles from "./page.module.css";

export default function Gallery() {
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        // add axios call here
        setLoading(false);
        setEntries([
            {
                id: 1,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 2,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
            {
                id: 3,
                caption: "nature in nature",
                image: "https://picsum.photos/id/237/200/300"
            },
        ])
    }, [])

    return (
        <main>
            <h1 className={styles.title}>ECHO</h1>
            <section className={styles.galleryWrapper}>
                <div className={styles.gallery}>
                    {entries.map((entry) => (
                        <div key={entry.id} className={styles.galleryItem}>
                            <img src={entry.image} alt={entry.caption} className={styles.galleryImg} width={280} height={400} />
                            <p className={styles.galleryItemInfo}>{entry.caption}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}