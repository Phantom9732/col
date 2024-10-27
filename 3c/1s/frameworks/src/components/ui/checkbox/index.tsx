import clsx from 'clsx';
import s from './styles.module.css';
import checkedImg from '../../../assets/images/checked.svg';
import { forwardRef, type ComponentProps, type ForwardedRef } from 'react';

interface Props extends ComponentProps<'input'> {
  ref?: ForwardedRef<HTMLInputElement>;
}

export const Checkbox = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  const { ...rest } = props;

  return (
    <div className={clsx(s.container)}>
      <label className={clsx(s.label)}>
        <input {...rest} type="checkbox" className={clsx(s.input)} ref={ref} />
        <img src={checkedImg} alt="checked icon" />
      </label>
    </div>
  );
});
