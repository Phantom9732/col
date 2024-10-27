import clsx from 'clsx';
import s from './styles.module.css';
import chevronDownImg from '../../../assets/images/chevron-down.svg';
import { useEffect, useRef, useState } from 'react';

type Item = { name: string; value: string };

type Props = {
  placeholder?: string;
  selectedValue: string | null;
  data: Item[];
  onSelect: (item: Item) => void;
};

export const Select = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { placeholder, data = [], selectedValue, onSelect = () => {} } = props;

  const selectedItem = data.find((el) => el.value === selectedValue);

  const handleToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', checkClickOutside);
    return () => document.body.removeEventListener('click', checkClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={clsx(s.container, isOpen && s.open)} onClick={handleToggle}>
      <div className={clsx(s.label)}>
        {selectedItem?.name || placeholder}
        <img className={clsx(s.chevron)} src={chevronDownImg} alt="" />
      </div>
      <div className={clsx(s.dropdown)}>
        {data.map((item) => (
          <div
            onClick={() => onSelect(item)}
            key={item.value}
            className={clsx(s.item, item.value === selectedValue && s.selected)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
