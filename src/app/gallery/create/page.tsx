"use client";

import Styles from './create.module.css';
import { CldImage, CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import 'next-cloudinary/dist/cld-video-player.css';

export default function CreateEntry() {
    return (
        <div className={Styles.container}>
            
            <h1 className={Styles.title}>Create your harbour</h1>
            {/* Figure out if it's Image of Video and Render Accordingly */}
            
        <CldUploadWidget uploadPreset="gallery-default">
            {({ open }) => {
                return (
                    <button className={Styles.primary_btn} onClick={() => open()}>Upload your memories</button>
                )
            
            }}
        </CldUploadWidget>
        </div>
    )
}