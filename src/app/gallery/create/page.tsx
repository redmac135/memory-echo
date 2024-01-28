"use client";

import {
  CldImage,
  CldUploadWidget,
  CldVideoPlayer,
  type CldUploadWidgetInfo,
} from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import styles from './create.module.css'

export default function CreateEntry() {
  const [mediaInfo, setMediaInfo] = useState<CldUploadWidgetInfo>();
  const [caption, setCaption] = useState<string>("");
  const USERID = "tmp-user";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mediaInfo) {
      console.error("Media info not found");
      return;
    }
    axios.post("/api/entries", {
      mediaId: mediaInfo.public_id,
      userId: USERID, // tmp userId
      isVideo: mediaInfo.resource_type === "video" ? true : false,
      caption: caption,
    });
    console.log("success");
    window.location.href = "/gallery";
  };

  return (
    <main className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        {mediaInfo ? (
          mediaInfo.resource_type === "video" ? (
            <CldVideoPlayer
              width={300}
              height={300}
              src={mediaInfo.public_id}
            />
          ) : (
            <CldImage
              width={300}
              height={300}
              src={mediaInfo.public_id}
              alt={caption}
            />
          )
        ) : null}

        <CldUploadWidget
          uploadPreset="gallery-default"
          onSuccess={(results) => {
            if (!results.info || typeof results.info === "string") {
              console.error("Upload failed");
              return;
            }
            setMediaInfo(results.info);
          }}
        >
          {({ open }) => {
            return (
                <button
                    className={styles.button}
                    onClick={(e) => {
                    e.preventDefault();
                    open();
                    }}
                >
                    Upload
                </button>
            );
          }}
        </CldUploadWidget>
            <input
            className={styles.input}
            type="text"
            placeholder="Tell us about your memory"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            />
        <div>
            <button className={styles.button}>Submit</button>
        </div>
      </form>
    </main>
  );
}
