import clsx from 'clsx';
import s from './styles.module.css';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { SectionTitle } from '../../components/ui/sectionTitle';
import { CartItem } from '../../components/cartItem';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { SuccessOrderPopup } from '../../components/successOrderPopup';
import { cartActions } from '../../store/cart';
import { usePageTitle } from '../../hooks/usePageTitle';

type FormState = {
  name: string;
  phone: string;
  email: string;
};

export const Cart = () => {
  usePageTitle('Cart');
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const items = Object.values(cart);
  const totalPrice = items.reduce((acc, c) => acc + c.qty * (c.data.discont_price || c.data.price), 0);
  const totalItems = items.reduce((acc, c) => acc + c.qty, 0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({});

  const submitHandler = async (state: FormState) => {
    console.log(state);
    const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/order/send');
    console.log(data);
    reset();
    setPopupIsOpen(true);
    dispatch(cartActions.clear());
  };

  return (
    <div className={clsx(s.wrapper)}>
      <SectionTitle to="/categories" title="Shopping cart" buttonText="Back to the store" />
      {items.length > 0 ? (
        <div className={clsx(s.content)}>
          <div className={clsx(s.items)}>
            {items.map((cartItem) => (
              <CartItem key={cartItem.data.id} product={cartItem} />
            ))}
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className={clsx(s.form)}>
            <div className={clsx(s.heading)}>Order details</div>
            <div className={clsx(s['items-count'])}>{totalItems} items</div>
            <div className={clsx(s['total-wrapper'])}>
              <div className={clsx(s.total)}>Total</div>
              <div className={clsx(s['total-price'])}>${totalPrice.toFixed(2)}</div>
            </div>
            <div className={clsx(s.inputs)}>
              <div>
                <Input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 3, message: 'Must be more than 3 chars' },
                  })}
                  errorMessage={errors.name?.message}
                  autoComplete="new-password"
                  placeholder="Name"
                />
              </div>
              <div>
                <Input
                  {...register('phone', {
                    required: 'Phone is required',
                    validate: {
                      phone: (value) =>
                        /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(value) || 'Phone must be in format: +7(999)999-99-99',
                    },
                  })}
                  errorMessage={errors.phone?.message}
                  autoComplete="new-password"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    validate: {
                      email: (value) => /^.+?@.+?\..{2,3}$/.test(value) || 'Incorrect email',
                    },
                  })}
                  errorMessage={errors.email?.message}
                  autoComplete="new-password"
                  placeholder="Email"
                />
              </div>
            </div>
            <Button color="green" full>
              Order
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <div className={clsx(s['empty-description'])}>Looks like you have no items in your basket currently.</div>
          <Link to="/categories">
            <Button type="button" color="green">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
      {popupIsOpen && <SuccessOrderPopup onClose={() => setPopupIsOpen(false)} />}
    </div>
  );
};
