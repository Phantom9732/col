import clsx from 'clsx';
import s from './styles.module.css';
import { RestoreScroll } from '../../components/restoreScroll';
import { Products } from '../../components/products';
import { useState } from 'react';
import { baseFilterState, FiltersState, sortBy } from '../../components/ui/filters/helpers';
import { Filters } from '../../components/ui/filters';
import { useAppSelector } from '../../store/hooks';
import { usePageTitle } from '../../hooks/usePageTitle';

export const ProductsPage = () => {
  usePageTitle('All products');
  const [filters, setFilters] = useState<FiltersState>({ ...baseFilterState });
  const products = useAppSelector((state) => state.products.data);

  const filtered = sortBy(products, filters, ['discount', 'range', 'sort']);

  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <h2 className="heading">All products</h2>
      <Filters onChange={setFilters} />
      <Products products={filtered} />
    </div>
  );
};
