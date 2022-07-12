export function requestUnThrottledAnimationFrame(
  callback: (timestamp: DOMHighResTimeStamp) => void
) {
  callback(window.performance.now());
}
