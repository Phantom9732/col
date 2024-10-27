import clsx from 'clsx';
import s from './styles.module.css';

type Props = {
  onClose: () => void;
};

export const SuccessOrderPopup = (props: Props) => {
  const { onClose } = props;

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={handleClose} className={clsx(s.container)}>
      <div className={clsx(s.content)}>
        <div className={clsx(s.times)} onClick={onClose}>
          &times;
        </div>
        <h3 className={clsx(s.title)}>Congratulations! </h3>
        <div className={clsx(s.text)}>
          <p>Your order has been successfully placed on the website.</p>
          <p>A manager will contact you shortly to confirm your order.</p>
        </div>
      </div>
    </div>
  );
};
