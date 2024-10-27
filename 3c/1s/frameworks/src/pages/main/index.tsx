import clsx from 'clsx';
import s from './styles.module.css';
import { Checkout } from '../../components/checkout';
import { SectionTitle } from '../../components/ui/sectionTitle';
import { Categories } from '../../components/categories';
import { FirstOrder } from '../../components/firstOrder';
import { RestoreScroll } from '../../components/restoreScroll';
import { usePageTitle } from '../../hooks/usePageTitle';
import { Products } from '../../components/products';

import { useAppSelector } from '../../store/hooks';

export const Main = () => {
  usePageTitle('Home');
  const products = useAppSelector((state) =>
    state.products.data.filter((product) => product.discont_price).slice(0, 4),
  );

  return (
    <>
      <RestoreScroll />
      <Checkout />
      <div className={clsx(s.wrapper)}>
        <SectionTitle to="/categories" title="Categories" buttonText="All categories" />
        <Categories oneLine cols={4} />
      </div>
      <div className={clsx(s.wrapper)}>
        <FirstOrder />
      </div>
      <div className={clsx(s.wrapper)}>
        <SectionTitle to="/sales" title="Sale" buttonText="All sales" />
        <Products products={products} />
      </div>
    </>
  );
};
