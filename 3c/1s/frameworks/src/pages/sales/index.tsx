import clsx from 'clsx';
import s from './styles.module.css';
import { RestoreScroll } from '../../components/restoreScroll';
import { Products } from '../../components/products';
import { Filters } from '../../components/ui/filters';
import { useState } from 'react';
import { baseFilterState, FiltersState, sortBy } from '../../components/ui/filters/helpers';
import { useAppSelector } from '../../store/hooks';
import { usePageTitle } from '../../hooks/usePageTitle';

export const SalesPage = () => {
  usePageTitle('All sales');
  const [filters, setFilters] = useState<FiltersState>({ ...baseFilterState });
  const products = useAppSelector((state) => state.products.data.filter((product) => product.discont_price));
  const filtered = sortBy(products, filters, ['range', 'sort']);
  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <h2 className="heading">Discounted items</h2>
      <Filters onChange={setFilters} filters={['range', 'sort']} />
      <Products products={filtered} />
    </div>
  );
};
