import clsx from 'clsx';
import s from './styles.module.css';
import { Input } from '../input';
import { Checkbox } from '../checkbox';
import { Select } from '../select';
import { useEffect, useState } from 'react';
import { baseFilterState, type FilterName, type FiltersState } from './helpers';

type Props = {
  onChange?: (filters: FiltersState) => void;
  filters?: FilterName[];
};

const parsePrice = (value: string) => {
  const parsed = parseInt(value);
  if (value.trim() === '' || Number.isNaN(parsed)) return null;
  return parsed;
};

const sortOptions = [
  { name: 'by default', value: 'default' },
  { name: 'newest', value: 'new' },
  { name: 'price: high-low', value: 'priceAsc' },
  { name: 'price: low-high', value: 'priceDesc' },
];

export const Filters = (props: Props) => {
  const { onChange, filters = ['range', 'discount', 'sort'] } = props;
  const [state, setState] = useState<FiltersState>({ ...baseFilterState });

  const changeFrom = (value: string) => setState((prev) => ({ ...prev, from: parsePrice(value) }));
  const changeTo = (value: string) => setState((prev) => ({ ...prev, to: parsePrice(value) }));
  const changeDiscount = (value: boolean) => setState((prev) => ({ ...prev, isDiscount: value }));
  const changeSort = (value: string) => setState((prev) => ({ ...prev, sortBy: value }));

  useEffect(() => {
    onChange?.(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className={clsx(s.container)}>
      {filters.includes('range') && (
        <div className={clsx(s.range)}>
          <div className={clsx(s.label)}>Price</div>
          <Input value={state.from ?? ''} onChange={(e) => changeFrom(e.target.value)} mini placeholder="From" />
          <Input value={state.to ?? ''} onChange={(e) => changeTo(e.target.value)} mini placeholder="To" />
        </div>
      )}
      {filters.includes('discount') && (
        <div className={clsx(s.discout)}>
          <div className={clsx(s.label)}>Discounted items</div>
          <Checkbox checked={state.isDiscount} onChange={(e) => changeDiscount(e.target.checked)} />
        </div>
      )}
      {filters.includes('sort') && (
        <div className={clsx(s.sorted)}>
          <div className={clsx(s.label)}>Sorted</div>
          <Select onSelect={(data) => changeSort(data.value)} data={sortOptions} selectedValue={state.sortBy} />
        </div>
      )}
    </div>
  );
};
