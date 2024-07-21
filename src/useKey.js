import { useEffect } from "react";

// a hook react to any key press
export function useKey(key, action) {
  useEffect(
    function () {
      function EscCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action(); // what you want to do after pressing that key
        }
      }

      document.addEventListener("keydown", EscCallback);

      return function () {
        document.removeEventListener("keydown", EscCallback);
      };
    },
    [action, key]
  );
  return [key, action];
}
