import { Outlet } from 'react-router-dom';
import { BaseLayout } from '../components/baseLayout';
import { Header } from '../components/header';
import { Contacts } from '../components/contacts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/categories';
import { fetchProducts } from '../store/products';

export const Root = () => {
  const dispatch = useAppDispatch();
  const catStatus = useAppSelector((state) => state.categories.status);
  const prodStatus = useAppSelector((state) => state.products.status);

  const isDone = [catStatus, prodStatus].every((stat) => stat === 'success');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isDone) return null;

  return (
    <BaseLayout>
      <Header />
      <Outlet />
      <Contacts />
    </BaseLayout>
  );
};
