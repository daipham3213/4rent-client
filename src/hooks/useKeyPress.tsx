import React from 'react';

interface KeyPressProps {
  targetKey: string;
}
const useKeyPress = ({ targetKey }: KeyPressProps) => {
  const [keyPressed, setKeyPressed] = React.useState<boolean>(false);

  const keyDownHandler = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey]
  );

  const keyUpHandler = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyDownHandler, keyUpHandler]);

  return keyPressed;
};

export default useKeyPress;
