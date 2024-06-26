export function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    // } else {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.webkitExitFullscreen) { /* Safari */
    //     document.webkitExitFullscreen();
    //   } else if (document.msExitFullscreen) { /* IE11 */
    //     document.msExitFullscreen();
    //   }
    // }
}