import React from 'react';

interface Props {
  onBottomReach: () => void;
  ref: React.MutableRefObject<any>;
}

const useBottomReached = ({ onBottomReach, ref }: Props) => {
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight === scrollHeight) {
      onBottomReach();
      console.log('Bottom reach!');
    }
  };

  return { onScroll };
};

export default useBottomReached;
