import React from 'react';

import classNames from 'classnames';

import { ITextArea } from './text-area';

const TextArea: React.FC<ITextArea> = ({
  onInput,
  placeholder,
  className,
  ref: _,
  onTextChanged,
  ...rest
}) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const [lastH, setLastH] = React.useState<number>(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onInput) {
      onInput(e);
    }
    const target = e.target as HTMLTextAreaElement;
    const { clientHeight } = target;
    if (lastH !== 0 && onTextChanged) {
      onTextChanged(lastH < clientHeight && e.target.value.length > 0);
    } else {
      setLastH(clientHeight);
    }
    if (ref.current) {
      ref.current.style.height = '1.25rem';
      ref.current.style.height = `${target.scrollHeight}px`;
    }
  };

  return (
    <textarea
      className={classNames(
        'textarea inline-block h-5 resize-none border-0 focus:outline-none focus:ring-0 dark:bg-gray-800',
        className
      )}
      role="textbox"
      ref={ref}
      placeholder={placeholder ?? 'Write your comment'}
      onInput={handleOnChange}
      {...rest}
    />
  );
};

export default TextArea;
