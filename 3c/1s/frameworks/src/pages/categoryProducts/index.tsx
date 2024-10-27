import clsx from 'clsx';
import s from './styles.module.css';
import { RestoreScroll } from '../../components/restoreScroll';
import { Products } from '../../components/products';
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound';
import { Filters } from '../../components/ui/filters';
import { useState } from 'react';
import { baseFilterState, sortBy, type FiltersState } from '../../components/ui/filters/helpers';
import { useAppSelector } from '../../store/hooks';
import { usePageTitle } from '../../hooks/usePageTitle';

export const CategoryProductsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filters, setFilters] = useState<FiltersState>({ ...baseFilterState });

  const products = useAppSelector((state) =>
    state.products.data.filter((product) => product.categoryId === +categoryId!),
  );
  const currentCategory = useAppSelector((state) =>
    state.categories.data.find((category) => category.id === +categoryId!),
  );

  usePageTitle(currentCategory?.title || 'Not Found');

  if (!currentCategory) {
    return <NotFound />;
  }

  const filtered = sortBy(products, filters, ['range', 'discount', 'sort']);

  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <h2 className="heading">{currentCategory.title}</h2>
      <Filters onChange={setFilters} />
      <Products products={filtered} />
    </div>
  );
};
