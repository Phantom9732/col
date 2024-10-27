import clsx from 'clsx';
import s from './styles.module.css';

import notFoundImg from '../../assets/images/404.png';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { RestoreScroll } from '../../components/restoreScroll';
import { usePageTitle } from '../../hooks/usePageTitle';

export const NotFound = () => {
  usePageTitle('Not Found');

  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <img className={clsx(s.image)} src={notFoundImg} alt="" />
      <h2 className={clsx(s.heading)}>Page Not Found</h2>
      <p className={clsx(s.description)}>
        We’re sorry, the page you requested could not be found. Please go back to the homepage.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};
