import clsx from 'clsx';
import s from './styles.module.css';
import { Link } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactElement | ReactElement[] | ReactNode;
  link: string;
  isTranslated?: boolean;
};

export const SectionButton = (props: Props) => {
  const { children, link, isTranslated } = props;

  return (
    <div className={clsx([s.container, isTranslated && s.isTranslated])}>
      <div className={clsx(s.line)} />
      <Link to={link} className={clsx(s.button)}>
        {children}
      </Link>
    </div>
  );
};
