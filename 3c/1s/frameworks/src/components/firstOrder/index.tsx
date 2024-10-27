import clsx from 'clsx';
import s from './styles.module.css';
import bg from '../../assets/images/first-order-bg.png';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

type FormState = {
  name: string;
  email: string;
  phone: string;
};

export const FirstOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>();
  const [isSubmited, setIsSubmited] = useState(false);

  const submitHandler = async (state: FormState) => {
    console.log(state);
    const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/order/send');
    console.log(data);
    reset();
    setIsSubmited(true);
  };

  return (
    <div className={clsx(s.container)}>
      <h2 className={clsx(s.heading)}>5% off on the first order</h2>
      <div className={clsx(s.content)}>
        <img className={clsx(s.image)} src={bg} alt="" />
        <form onSubmit={handleSubmit(submitHandler)} className={clsx(s.form)}>
          <div>
            <Input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'Must be more than 3 chars' },
              })}
              errorMessage={errors.name?.message}
              autoComplete="new-password"
              placeholder="Name"
              transparent
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
              transparent
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
              transparent
            />
          </div>
          <div className={clsx(s.button)}>
            <Button inactive={isSubmited} type="submit" color={isSubmited ? 'done' : 'white'} full borderless bold>
              {isSubmited ? 'Request Submitted' : 'Get a discount'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
