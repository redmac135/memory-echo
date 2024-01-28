"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import AudioCapture from "@/lib/components/AudioCapture";
import Example from "./Modal";
import styles from "./echo.module.css";
import { Emotions, type Emotion } from "@/lib/schema";
import EchoPrompt from "@/lib/components/EchoPrompt";
import axios from "axios";

const HAPPY_EMOTIONS = [
  "Admiration",
  "Adoration",
  "Aesthetic Appreciation",
  "Amusement",
  "Awe",
  "Contentment",
  "Ecstasy",
  "Empathic Pain",
  "Interest",
  "Joy",
  "Love",
  "Realization",
  "Relief",
  "Romance",
  "Surprise (positive)",
  "Triumph",
];

const SAD_EMOTIONS = [
  "Anger",
  "Anxiety",
  "Awkwardness",
  "Boredom",
  "Confusion",
  "Contempt",
  "Disappointment",
  "Disgust",
  "Distress",
  "Doubt",
  "Embarrassment",
  "Fear",
  "Guilt",
  "Horror",
  "Pain",
  "Shame",
  "Surprise (negative)",
];

export default function Echo() {
  <div className={styles.background}></div>
  const webcamRef = useRef<Webcam>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [capturing, setCapturing] = useState(false);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [audioEncoded, setAudioEncoded] = useState("");
  const [promptId, setPromptId] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [runningTotal, setRunningTotal] = useState<Emotions>();

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (!webcamRef.current) return;
    if (!webcamRef.current.stream) return;
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.start();
  }, [setCapturing, mediaRecorderRef]);

  const handleStopCaptureClick = useCallback(() => {
    if (!mediaRecorderRef.current) {
      return;
    }
    mediaRecorderRef.current.stop();
    setCapturing(false);

    // compute the final happiness score
    let happiness = 0;
    if (runningTotal) {
      for (const [emotion, score] of Object.entries(runningTotal)) {
        if (emotion in HAPPY_EMOTIONS) {
          happiness += score;
        } else if (emotion in SAD_EMOTIONS) {
          happiness -= score;
        }
      }

      axios.post("/api/echoprompt", {
        promptId: promptId,
        mediaId: mediaId,
        happiness: happiness,
      });
    }
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <main>
      <Webcam
        videoConstraints={videoConstraints}
        audio={true}
        ref={webcamRef}
      />
      <Example/>
      {capturing ? (
        
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      <AudioCapture
        capturing={capturing}
        audioEncoded={audioEncoded}
        setAudioEncoded={setAudioEncoded}
        setEmotions={setEmotions}
        setRunningTotal={setRunningTotal}
      />
      <EchoPrompt setPromptId={setPromptId} setMediaId={setMediaId} />
      <table>
        <thead>
          <tr>
            <th>Emotion</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {emotions
            .sort((a, b) => {
              return b.score - a.score;
            })
            .slice(0, 5)
            .map((emotion) => (
              <tr key={emotion.name}>
                <td>{emotion.name}</td>
                <td>{emotion.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
