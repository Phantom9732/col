import clsx from 'clsx';
import s from './styles.module.css';
import { cartActions, type CartProduct } from '../../store/cart';
import { RestoreScroll } from '../../components/restoreScroll';
import { useAppDispatch } from '../../store/hooks';
import { useState } from 'react';

type Props = {
  product: CartProduct;
};

export const CartItem = (props: Props) => {
  const {
    qty,
    data: { id, title, image, price, discont_price },
  } = props.product;
  const dispatch = useAppDispatch();
  const [productQty, setProductQty] = useState<number>(qty);

  const handleDec = () => {
    dispatch(cartActions.decItem(id));
    setProductQty((q) => q - 1);
  };

  const handleInc = () => {
    dispatch(cartActions.incItem(id));
    setProductQty((q) => q + 1);
  };

  const handleChangeInputValue = (value: string) => {
    const fixedValue = +value.trim().replace(/\D/, '');
    setProductQty(fixedValue);
  };

  const handleChangeQty = (qty: number) => {
    const fixedValue = Number.isNaN(qty) ? 1 : Math.min(Math.max(qty, 1), 100);
    setProductQty(fixedValue);
    dispatch(cartActions.changeQty({ productId: id, qty: fixedValue }));
  };

  return (
    <div className={clsx(s.wrapper)}>
      <RestoreScroll />
      <img src={`${import.meta.env.VITE_BACKEND_URL}${image}`} alt="" className={clsx(s.image)} />
      <div className={clsx(s.details)}>
        <div className={clsx(s['title-wrapper'])}>
          <div className={clsx(s.title)}>{title}</div>
          <button onClick={() => dispatch(cartActions.deleteItem(id))} className={clsx(s['delete-item'])} type="button">
            &times;
          </button>
        </div>
        <div className={clsx(s['price-wrapper'])}>
          <div className={clsx(s['cart-options'])}>
            <div className={clsx(s.calc_count)}>
              <button className={clsx([s.calc_count_button, s['fix-left-margin']])} onClick={handleDec}>
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
                onClick={handleInc}
                disabled={qty > 99}
              >
                +
              </button>
            </div>
          </div>
          <div className={clsx(s['price-container'])}>
            <div className={clsx(s['price'])}>${discont_price ?? price}</div>
            {discont_price && <div className={clsx(s['old-price'])}>${price}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
