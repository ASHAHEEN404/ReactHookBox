import { useEffect, useState } from "react";

export function useLocalStorgeState(intialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : intialState; // which is an empty array
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
