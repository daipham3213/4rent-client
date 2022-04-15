import React from 'react';

const useOnScroll = () => {
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });

  const handleScroll = React.useCallback(() => {
    setData((last) => {
      return {
        x: window.scrollX,
        y: window.scrollY,
        lastX: last.x,
        lastY: last.y,
      };
    });
  }, []);


  // set up event listeners
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return data;
};

export default useOnScroll;
