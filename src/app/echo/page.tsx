"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import AudioCapture from "@/lib/components/AudioCapture";
import Example from "./Modal";
import styles from "./page.module.css";
import { Emotions, type Emotion, EmotionData } from "@/lib/schema";
import EchoPrompt from "@/lib/components/EchoPrompt";
import axios from "axios";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  <div className={styles.background}></div>;
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [capturing, setCapturing] = useState(false);
  const [emotions, setEmotions] = useState<Emotion[]>([
    { name: "Admiration", score: 1.0 },
    { name: "Adoration", score: 0.25 },
    { name: "Aesthetic Appreciation", score: 0.0 },
  ]);
  const [audioEncoded, setAudioEncoded] = useState("");
  const [promptId, setPromptId] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [runningTotal, setRunningTotal] = useState<Emotions>(EmotionData);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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

    setModal(true);
    console.log("hi");
  }, [mediaRecorderRef, webcamRef, setCapturing, setModal]);

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Echoing...</h1>
      <div className={styles.background} />
      <div className={styles.flexContainer}>
        <section className={styles.left}>
          <Webcam
            videoConstraints={videoConstraints}
            audio={true}
            ref={webcamRef}
          />
          {capturing ? (
            <button
              className={styles.startstopbutton}
              onClick={handleStopCaptureClick}
            >
              Stop Capture
            </button>
          ) : (
            <button
              className={styles.startstopbutton}
              onClick={handleStartCaptureClick}
            >
              Start Capture
            </button>
          )}
        </section>
        <Example modal={modal} toggle={toggle} />
        <AudioCapture
          capturing={capturing}
          audioEncoded={audioEncoded}
          setAudioEncoded={setAudioEncoded}
          setEmotions={setEmotions}
          setRunningTotal={setRunningTotal}
        />

        <section className={styles.right}>
          <div className={styles.topright}>
            <EchoPrompt setPromptId={setPromptId} setMediaId={setMediaId} />
          </div>
          <div className={styles.bottomright}>
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
                  .slice(0, 3)
                  .map((emotion) => (
                    <tr key={emotion.name}>
                      <td>{emotion.name}</td>
                      <td className={styles.progressRow}>
                        <Progress
                          value={emotion.score * 100}
                          className={styles.progressBar}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
