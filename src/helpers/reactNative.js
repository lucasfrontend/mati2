export const openCameraRN = (type = "dniScanner") => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
      })
    );
  }
};
