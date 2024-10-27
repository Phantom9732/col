import clsx from 'clsx';
import s from './styles.module.css';
import logoImage from '../../assets/images/logo.svg';
import cartImage from '../../assets/images/cart.svg';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export const Header = () => {
  const cart = useAppSelector((state) => state.cart);
  const count = Object.values(cart).reduce((acc, c) => acc + c.qty, 0) || 0;

  return (
    <header className={clsx(s.header)}>
      <div className={clsx(s.logo)}>
        <NavLink to="/">
          <img src={logoImage} alt="logo" />
        </NavLink>
      </div>
      <div className={clsx(s.menu)}>
        <NavLink to="/" className={clsx(s['menu-item'])}>
          Main Page
        </NavLink>
        <NavLink to="/categories" className={clsx(s['menu-item'])}>
          Categories
        </NavLink>
        <NavLink to="/products" end className={clsx(s['menu-item'])}>
          All products
        </NavLink>
        <NavLink to="/sales" className={clsx(s['menu-item'])}>
          All sales
        </NavLink>
      </div>
      <NavLink to="/cart" className={clsx(s.cart)}>
        {count > 0 && <div className={clsx(s.counter)}>{count}</div>}
        <img src={cartImage} alt="cart" />
      </NavLink>
    </header>
  );
};
