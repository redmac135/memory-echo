"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Entry, Media } from "@/lib/schema";
import { CldImage, CldVideoPlayer } from "next-cloudinary";

export default function EchoPrompt({ setPromptId }: { setPromptId: any }) {
  const [prompt, setPrompt] = useState<Entry>();
  const [media, setMedia] = useState<Media>();

  useEffect(() => {
    axios.get("/api/echoprompt").then((res) => {
      setPrompt(res.data);
      setPromptId(res.data.id);
    });

    axios
      .get("/api/media", { params: { mediaId: prompt?.mediaId } })
      .then((res) => {
        setMedia(res.data);
      });
  });

  return (
    <div>
      <p>Let's talk about...</p>
      {media?.isVideo ? (
        <CldVideoPlayer src={media?.publicId} width={280} height={400} />
      ) : (
        <CldImage
          src={media?.publicId}
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
