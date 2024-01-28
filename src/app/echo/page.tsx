"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import AudioCapture from "@/lib/components/AudioCapture";
import { type Emotion } from "@/lib/schema";
import EchoPrompt from "@/lib/components/EchoPrompt";

export default function Echo() {
  const webcamRef = useRef<Webcam>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [capturing, setCapturing] = useState(false);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [audioEncoded, setAudioEncoded] = useState("");
  const [promptId, setPromptId] = useState("");

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
      />
      <EchoPrompt setPromptId={setPromptId} />
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
