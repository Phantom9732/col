import clsx from 'clsx';
import s from './styles.module.css';

import { Product } from '../../api/backend.types';
import { ProductItem } from './productItem';

type Props = {
  products: Product[];
};

export const Products = (props: Props) => {
  const { products } = props;
  return (
    <div className={clsx(s.products)}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
