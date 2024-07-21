import { useRef, useState } from "react";

export function useGeoloaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});
  const count = useRef(0);

  function getPosition() {
    count.current++;
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}
