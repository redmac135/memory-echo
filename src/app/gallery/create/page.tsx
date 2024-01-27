"use client";

import { CldImage, CldUploadWidget, CldVideoPlayer } from "next-cloudinary"
import 'next-cloudinary/dist/cld-video-player.css';

export default function CreateEntry() {
    return (
        <div>
            {/* Figure out if it's Image of Video and Render Accordingly */}
        <CldImage width={300} height={300} src="gallery/we6jzvdktvrjutozjzor" alt="img" />
        <CldVideoPlayer width={300} height={300} src="gallery/we6jzvdktvrjutozjzor" />

        <CldUploadWidget uploadPreset="gallery-default">
            {({ open }) => {
                return (
                    <button onClick={() => open()}>Upload</button>
                )
            
            }}
        </CldUploadWidget>
        </div>
    )
}