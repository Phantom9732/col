import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import { calcDiscontPercent } from '../../utils';

import s from './styles.module.css';
import { useState } from 'react';

import { Button } from '../../components/ui/button';

import { RestoreScroll } from '../../components/restoreScroll';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NotFound } from '../NotFound';
import { cartActions } from '../../store/cart';
import { usePageTitle } from '../../hooks/usePageTitle';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productQty, setProductQty] = useState<number>(1);
  const products = useAppSelector((state) => state.products.data);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const product = products.find((product) => product.id === Number(productId));

  usePageTitle(product?.title || 'Not Found');

  if (!productId) return <NotFound />;

  if (!product) return <NotFound />;

  const isInCart = Boolean(cart[productId]);
  const { title, image, price, discont_price, description } = product;

  const handleAddToCart = () => {
    dispatch(cartActions.addItem({ product, qty: productQty }));
  };

  const handleChangeInputValue = (value: string) => {
    const fixedValue = +value.trim().replace(/\D/, '');
    setProductQty(fixedValue);
  };

  const handleChangeQty = (qty: number) => {
    const fixedQty = Number.isNaN(qty) ? 1 : Math.min(Math.max(qty, 1), 100);
    setProductQty(fixedQty);
  };

  return (
    <div className={clsx(s.product)}>
      <RestoreScroll />
      <img src={`${import.meta.env.VITE_BACKEND_URL}${image}`} alt="" className={clsx(s.image)} />
      <div className="details">
        <div className={clsx(s.title)}>{title}</div>
        <div className={clsx(s['price-wrapper'])}>
          <div className={clsx(s.price)}>${discont_price ?? price}</div>
          {discont_price && <div className={clsx(s['old-price'])}>${price}</div>}
          {discont_price && (
            <div className={clsx(s['discont-percent'])}>-{calcDiscontPercent(price, discont_price)}%</div>
          )}
        </div>
        <div className={clsx(s['cart-options'])}>
          <div className={clsx(s.calc_count)}>
            <button
              className={clsx([s.calc_count_button, s['fix-left-margin']])}
              onClick={() => handleChangeQty(productQty - 1)}
              disabled={productQty < 2}
            >
              -
            </button>
            <input
              className={clsx(s.calc_count_input)}
              type="text"
              value={productQty}
              onChange={(e) => handleChangeInputValue(e.target.value)}
              onBlur={() => handleChangeQty(productQty)}
            />
            <button
              className={clsx([s.calc_count_button, s['fix-right-margin']])}
              onClick={() => handleChangeQty(productQty + 1)}
              disabled={productQty > 99}
            >
              +
            </button>
          </div>
          <Button color={isInCart ? 'white' : 'green'} full onClick={handleAddToCart}>
            {isInCart ? 'Added' : 'Add to cart'}
          </Button>
        </div>
        <div className={clsx(s.description_wrapper)}>
          <h5 className={clsx(s['description-heading'])}>Description</h5>
          <p className={clsx(s.description)}>{description}</p>
        </div>
      </div>
    </div>
  );
};
