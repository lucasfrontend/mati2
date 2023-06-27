<template>
    <div>
      <video ref="video" autoplay></video>
    </div>
  </template>
  
  <script>
  /*
import BlinkInputSDK from "@microblink/blinkinput-in-browser-sdk";

const pdf417Recognizer = new BlinkInputSDK.Recognizers.Pdf417Recognizer();
  
  export default {
    data() {
      return {
        detector: null,
        videoStream: null,
      };
    },
    created() {
        this.$nextTick(() => {
            const videoElement = document.getElementById("video-element");
            videoElement.addEventListener("canplay", () => {
                // Aquí es donde se inicia el procesamiento del video.
            });
        });
    },
    mounted() {
    const recognizerRunner = new BlinkInputSDK.RecognizerRunner({
        recognizers: [pdf417Recognizer],
        successFrameGrabberCallback: (frame) => {
            // Este callback se ejecuta cada vez que se procesa correctamente un marco de video.
        }
    });

    this.recognizerRunner = recognizerRunner;
}
  };
  */
  </script>
  