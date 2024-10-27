import clsx from 'clsx';
import s from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

// import categories from '../../categories.json';

type Props = {
  cols?: number;
  oneLine?: boolean;
};

export const Categories = (props: Props) => {
  const { cols = 5, oneLine } = props;
  const categories = useAppSelector((state) => state.categories.data);

  const list = oneLine ? categories.slice(0, cols) : categories;

  return (
    <div className={clsx(s.list)} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {list.map((category) => (
        <div className={clsx(s.item)} key={category.id}>
          <Link to={`/categories/${category.id}`}>
            <img className={clsx(s.image)} src={`${import.meta.env.VITE_BACKEND_URL}${category.image}`} alt="" />
            <p className={clsx(s.label)}>{category.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
