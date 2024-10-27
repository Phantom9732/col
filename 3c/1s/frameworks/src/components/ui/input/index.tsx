import { forwardRef, type ComponentProps, type ForwardedRef } from 'react';
import s from './styles.module.css';
import clsx from 'clsx';

interface Props extends ComponentProps<'input'> {
  errorMessage?: string;
  transparent?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  mini?: boolean;
}

export const Input = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { errorMessage, transparent, mini, ...rest } = props;

  return (
    <div className={clsx(s.container)}>
      <input
        ref={ref}
        className={clsx([s.input, Boolean(errorMessage) && s.error, transparent && s.transparent, mini && s.mini])}
        {...rest}
        type="text"
      />
      {errorMessage && <div className={clsx(s.errorMessage)}>{errorMessage}</div>}
    </div>
  );
});
