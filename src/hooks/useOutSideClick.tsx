import React from 'react';

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as any)) {
        callback();
      }
    };
    document.addEventListener(mouseEvent, handler, true);
    return () => {
      document.removeEventListener(mouseEvent, handler);
    };
  }, [callback, mouseEvent, ref]);
}

export default useOutsideClick;
