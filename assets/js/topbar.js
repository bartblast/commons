// Based on: https://fly.io/phoenix-files/make-your-liveview-feel-faster/

import topbar from "../vendor/topbar"

export default function initTopbar() {
  // Show progress bar on live navigation and form submits
  topbar.config({barColors: {0: "#0969da"}, barThickness: 2, shadowColor: "rgba(0, 0, 0, .3)"})

  let topBarScheduled = undefined;

  window.addEventListener("phx:page-loading-start", () => {
    if (!topBarScheduled) {
      topBarScheduled = setTimeout(() => topbar.show(), 120);
    };
  });

  window.addEventListener("phx:page-loading-stop", () => {
    clearTimeout(topBarScheduled);
    topBarScheduled = undefined;
    topbar.hide();
  });
}