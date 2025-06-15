const input = document.querySelector("input");
const throttleText = document.querySelector(".throttle");

function throttle(callback, delay = 1000) {
  let lastCall = 0;
  let lastArgs = null;
  let timeoutId;

  function throttled(...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      callback.apply(this, args);
      lastCall = now;
    } else {
      lastArgs = args;
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        callback.apply(this, lastArgs);
        lastCall = Date.now();
      }, delay - (now - lastCall));
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = null;
  };
  return throttled;
}

input.addEventListener("input", function (e) {
  throttleFunc(e.target.value);
});

const throttleFunc = throttle((text) => {
  throttleText.textContent = text;
});
