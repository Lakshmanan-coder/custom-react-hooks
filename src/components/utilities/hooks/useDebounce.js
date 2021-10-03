import { useRef } from "react";
import { useEffect } from "react";

function useDebounce(callback, delay, dependency) {
  const timeOutRef = useRef();

  useEffect(() => {
    
      timeOutRef.current = setTimeout(() => callback(), delay);
    

    return () => {
      timeOutRef.current && clearTimeout(timeOutRef.current);
    };
  }, [dependency]);

  useEffect(() => {
    timeOutRef.current && clearTimeout(timeOutRef.current);
  }, []);
}

export default useDebounce;
