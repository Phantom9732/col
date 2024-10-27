import clsx from 'clsx';
import s from './styles.module.css';
import { Link } from 'react-router-dom';

import { Product } from '../../../api/backend.types';
import { calcDiscontPercent } from '../../../utils';
import { Button } from '../../ui/button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { cartActions } from '../../../store/cart';

type Props = {
  product: Product;
};

export const ProductItem = (props: Props) => {
  const {
    product: { id, title, image, price, discont_price },
  } = props;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const isInCart = Boolean(cart[id]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(cartActions.addItem({ product: props.product }));
    console.log('addded');
  };

  return (
    <Link to={`/products/${id}`} className={clsx(s.product)}>
      <div className={clsx(s['image-wrapper'])}>
        <img src={`${import.meta.env.VITE_BACKEND_URL}${image}`} alt={title} className={clsx(s.image)} />
        <div className={clsx(s['button-position'])}>
          <Button color={isInCart ? 'white' : 'green'} full onClick={handleAddToCart}>
            {isInCart ? 'Added' : 'Add to cart'}
          </Button>
        </div>
        {discont_price && (
          <div className={clsx(s['discont-percent'])}>-{calcDiscontPercent(price, discont_price)}%</div>
        )}
      </div>
      <div className={clsx(s.details)}>
        <div className={clsx(s.title)}>{title}</div>
        <div className={clsx(s['price-wrapper'])}>
          <div className={clsx(s.price)}>${discont_price ?? price}</div>
          {discont_price && <div className={clsx(s['old-price'])}>${price}</div>}
        </div>
      </div>
    </Link>
  );
};
