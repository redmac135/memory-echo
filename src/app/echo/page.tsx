"use client"

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam"
import AudioCapture from "@/lib/components/AudioCapture";
import { type Emotion } from "@/lib/schema";

export default function Echo() {
    const webcamRef = useRef<Webcam>();
    const mediaRecorderRef = useRef<MediaRecorder>();
    const [capturing, setCapturing] = useState(false);
    // const [recordedChunks, setRecordedChunks] = useState([]);
    const [emotions, setEmotions] = useState<Emotion[]>([])
    const [audioEncoded, setAudioEncoded] = useState("");

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm"
        });
        // mediaRecorderRef.current.addEventListener(
        //   "dataavailable",
        //   handleDataAvailable
        // );
        mediaRecorderRef.current.start();
      }, [webcamRef, setCapturing, mediaRecorderRef]);
    
      // const handleDataAvailable = useCallback(
      //   ({ data }) => {
      //     if (data.size > 0) {
      //       setRecordedChunks((prev) => prev.concat(data));
      //     }
      //   },
      //   [setRecordedChunks]
      // );
    
      const handleStopCaptureClick = useCallback(() => {
        if (!mediaRecorderRef.current) {return}
        mediaRecorderRef.current.stop();
        setCapturing(false);
      }, [mediaRecorderRef, webcamRef, setCapturing]);
    
      // const handleUpload = useCallback(() => {
      //   if (recordedChunks.length) {
      //       const blob = new Blob(recordedChunks, {
      //           type: "video/webm"
      //         });
          
      //     const reader = new FileReader();
      //       reader.readAsDataURL(blob);
      //       reader.onloadend = function () {
      //           const base64data = reader.result;
      //           // upload data to cloudinary
      //           axios
      //               .post(`api/media`, {
      //                   file: base64data,
      //                   userId: 1,
      //                   isVideo: true,
      //               })
      //               .then((res) => {
      //                   console.log(res);
      //               })
      //               .catch((err) => {
      //                   console.log(err);
      //               });
      //       };
      //   //   const url = URL.createObjectURL(blob);
      //   //   const a = document.createElement("a");
      //   //   document.body.appendChild(a);
      //   //   a.style = "display: none";
      //   //   a.href = url;
      //   //   a.download = "react-webcam-stream-capture.webm";
      //   //   a.click();
      //   //   window.URL.revokeObjectURL(url);
      //     setRecordedChunks([]);
      //   }
      // }, [recordedChunks]);

    const videoConstraints = {
        facingMode: "user"
    }

    return (
        <main>
            <Webcam videoConstraints={videoConstraints} audio={true} ref={webcamRef} />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            <AudioCapture capturing={capturing} audioEncoded={audioEncoded} setAudioEncoded={setAudioEncoded} setEmotions={setEmotions} />
            <table>
                <thead>
                    <tr>
                        <th>Emotion</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {emotions.sort((a,b) => {return b.score-a.score}).slice(0,5).map((emotion) => (
                        <tr>
                            <td>{emotion.name}</td>
                            <td>{emotion.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}