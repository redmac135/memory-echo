"use client";

import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import AudioAnalysis from "./AudioAnalysis";

export default function AudioCapture({
  capturing,
  audioEncoded,
  setAudioEncoded,
  setEmotions,
  setRunningTotal,
}: {
  capturing: boolean;
  audioEncoded: string;
  setAudioEncoded: any;
  setEmotions: any;
  setRunningTotal: any;
}) {
  const [currentAudio, setCurrentAudio] = useState({});

  const { startRecording, stopRecording, recordingBlob, recordingTime } =
    useAudioRecorder(
      {
        noiseSuppression: false,
        echoCancellation: false,
      },
      (err) => console.error(err)
    );

  useEffect(() => {
    if (!capturing) {
      return;
    }
    startRecording();

    // To save money, stop recording after 3 seconds
    if (recordingTime > 3) {
      stopRecording();
      console.log("audio stopped after 3 seconds");
    }

    if (recordingBlob && recordingBlob != currentAudio) {
      setCurrentAudio(recordingBlob);
      addAudioElement(recordingBlob);
    }
  }, [capturing, recordingTime]);

  const addAudioElement = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setAudioEncoded(reader.result.split(",")[1]);
    };
  };

  return (
    <AudioAnalysis
      setEmotions={setEmotions}
      setRunningTotal={setRunningTotal}
      audioEncoded={audioEncoded}
      capturing={capturing}
    />
  );
}