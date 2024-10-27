import clsx from 'clsx';
import { Categories } from '../../components/categories';
import s from './styles.module.css';
import { RestoreScroll } from '../../components/restoreScroll';
import { usePageTitle } from '../../hooks/usePageTitle';

export const CategoriesPage = () => {
  usePageTitle('Categories');

  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <h2 className="heading">Categories</h2>
      <Categories />
    </div>
  );
};
