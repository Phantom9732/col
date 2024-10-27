import type { ComponentProps, ReactElement, ReactNode } from 'react';
import s from './styles.module.css';
import clsx from 'clsx';

interface Props extends ComponentProps<'button'> {
  color?: 'green' | 'black' | 'white' | 'done';
  full?: boolean;
  borderless?: boolean;
  bold?: boolean;
  inactive?: boolean;
  noPointerEvents?: boolean;
  children: ReactElement | ReactElement[] | ReactNode;
}

export const Button = (props: Props) => {
  const { children, color, full, bold, borderless, inactive, noPointerEvents, ...rest } = props;

  return (
    <button
      className={clsx([
        s.button,
        borderless && s.borderless,
        full && s.full,
        bold && s.bold,
        color === 'black' && s.black,
        color === 'white' && s.white,
        color === 'done' && s.done,
        noPointerEvents && s.noEvents,
        inactive && s.inactive,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};
