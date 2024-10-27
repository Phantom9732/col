import clsx from 'clsx';
import s from './style.module.css';
import type { ReactElement } from 'react';

type Props = {
  children: ReactElement | ReactElement[];
};

export const BaseLayout = (props: Props) => {
  return <div className={clsx(s.layout)}>{props.children}</div>;
};
