import { useState, useEffect, useMemo, useRef } from "react";
import debounce from "debounce";
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
export function useDebouncedEffect(callback, value, wait) {
  const callbackRef = useRef(callback);
  const cleanUpRef = useRef(noop);
  useEffect(() => {
    if (wait <= 0) {
      return;
    }
    cleanUpRef.current();
    cleanUpRef.current = noop;
    const callback = callbackRef.current;
    const trigger = () => {
      const cleanUp = callback();
      if (typeof cleanUp === "function") {
        cleanUpRef.current = cleanUp;
      } else if (cleanUp !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          "useDebouncedEffect callback should return undefined or a clean-up function"
        );
      }
    };
    const tick = setTimeout(trigger, wait);
    return () => {
      clearTimeout(tick);
      cleanUpRef.current();
      cleanUpRef.current = noop;
    };
  }, [value, wait]);
  callbackRef.current = callback;
}
export function useDebouncedValue(value, wait) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useDebouncedEffect(() => setDebouncedValue(value), value, wait);
  return wait > 0 ? debouncedValue : value;
}
export function useDebouncedCallback(callback, wait) {
  const debouncedCallback = useMemo(
    () => (wait > 0 ? debounce(callback, wait) : callback),
    [callback, wait]
  );
  useEffect(() => {
    return () => {
      const callback = debouncedCallback;
      callback.clear && callback.clear();
    };
  }, [debouncedCallback]);
  return debouncedCallback;
}
//# sourceMappingURL=index.js.map
