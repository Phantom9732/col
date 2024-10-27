import clsx from 'clsx';
import s from './styles.module.css';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  return (
    <section className={clsx(s.wrapper)}>
      <div className={clsx(s.fade)} />
      <h2 className={clsx(s.title)}>Amazing Discounts on Garden Products!</h2>
      <Link to="/sales">
        <Button>Check out</Button>
      </Link>
    </section>
  );
};
