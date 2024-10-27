import clsx from 'clsx';
import s from './styles.module.css';
import { SectionButton } from '../sectionButton';

type Props = {
  to: string;
  title: string;
  buttonText: string;
};

export const SectionTitle = (props: Props) => {
  const { buttonText, title, to } = props;

  return (
    <div className={clsx(s['heading-block'])}>
      <div className="heading">{title}</div>
      <SectionButton link={to} isTranslated>
        {buttonText}
      </SectionButton>
    </div>
  );
};
