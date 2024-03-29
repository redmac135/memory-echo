"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Entry, Media } from "@/lib/schema";
import { CldImage, CldVideoPlayer } from "next-cloudinary";

export default function EchoPrompt({
  setPromptId,
  setMediaId,
}: {
  setPromptId: any;
  setMediaId: any;
}) {
  const [prompt, setPrompt] = useState<Entry>();
  const [media, setMedia] = useState<Media>();

  useEffect(() => {
    axios.get("/api/echoprompt").then((res) => {
      setPrompt(res.data);
      setPromptId(res.data.id);
      setMediaId(res.data.mediaId);
    });
  }, [setMediaId, setPromptId, setPrompt]);

  useEffect(() => {
    if (prompt?.mediaId) {
      axios
        .get("/api/media", { params: { mediaId: prompt.mediaId } })
        .then((res) => {
          setMedia(res.data);
        });
    }
  }, [prompt]);

  return (
    <div>
      <p>Let&apos;s talk about...</p>
      {media?.isVideo ? (
        <CldVideoPlayer src={media?.publicId} width={280} height={400} />
      ) : (
        <CldImage
          //@ts-ignore
          src={media?.publicId}
          //@ts-ignore
          alt={prompt?.caption}
          width={300}
          height={300}
          crop="fill"
        />
      )}
      <p>
        This {media?.isVideo ? "video" : "photo"} of {prompt?.caption}
      </p>
    </div>
  );
}
