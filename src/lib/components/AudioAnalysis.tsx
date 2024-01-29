"use client";

import { useEffect, useRef } from "react";
import { EmotionName, Emotions } from "@/lib/schema";

export default function AudioAnalysis({
  audioEncoded,
  setEmotions,
  setRunningTotal,
  capturing,
}: {
  audioEncoded: string;
  setEmotions: any;
  setRunningTotal: any;
  capturing: boolean;
}) {
  const APIKEY = process.env.NEXT_PUBLIC_HUME_API_KEY;
  const socketRef = useRef<WebSocket | null>(null);
  const serverReadyRef = useRef(true);

  useEffect(() => {
    if (!capturing) {
      return;
    }
    if (!audioEncoded) {
      return;
    }
    connect();

    function connect() {
      socketRef.current = new WebSocket(
        `wss://api.hume.ai/v0/stream/models?apiKey=${APIKEY}`
      );
      socketRef.current.onopen = socketOnOpen;
      socketRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.error) {
          console.error("Error:", data.error);
          return;
        }
        setEmotions(data.prosody.predictions[0].emotions);
        setRunningTotal((prev: Emotions) => {
          let newValue: { [key: string]: number } = { ...prev };
          data.prosody.predictions[0].emotions.forEach(
            (emotionObj: { name: EmotionName; score: number }) => {
              const emotionName: EmotionName = emotionObj.name;
              newValue[emotionName] = prev[`${emotionName}`] + emotionObj.score;
            }
          );
          return newValue;
        });
      };
      socketRef.current.onclose = () => {
        console.log("Disconnected from Hume");
      };
    }

    async function sendRequest() {
      console.log(audioEncoded);
      const socket = socketRef.current;
      if (!socket) {
        console.log("Socket not connected");
        return;
      }
      console.debug(socket.readyState);
      if (socket.readyState === socket.OPEN) {
        socket.send(
          JSON.stringify({
            models: {
              prosody: {},
            },
            data: audioEncoded,
          })
        );
      }
    }

    async function socketOnOpen() {
      console.log("Socket connected!");
      if (serverReadyRef.current) {
        sendRequest();
      }
    }

    const repeater = setTimeout(() => capturing && sendRequest(), 3000);
    return () => clearTimeout(repeater);
  }, [audioEncoded, capturing]);

  return <></>;
}
