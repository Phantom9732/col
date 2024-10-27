import clsx from 'clsx';
import s from './styles.module.css';

import instImg from '../../assets/images/instargram.svg';
import waImg from '../../assets/images/whatsapp.svg';

export const Contacts = () => {
  return (
    <section className={clsx(s.wrapper)}>
      <h2 className="heading">Contacts</h2>
      <div className={clsx(s.list)}>
        <div className={clsx(s.item)}>
          <div className={clsx(s.label)}>Phone</div>
          <div className={clsx(s.description)}>+7 (499) 350-66-04</div>
        </div>
        <div className={clsx(s.item)}>
          <div className={clsx(s.label)}>Socials</div>
          <div className={clsx(s.socials)}>
            <a href="http://instagram.com">
              <img src={instImg} alt="instagram" />
            </a>
            <a href="https://www.whatsapp.com">
              <img src={waImg} alt="whatsapp" />
            </a>
          </div>
        </div>
        <div className={clsx(s.item)}>
          <div className={clsx(s.label)}>Address</div>
          <div className={clsx(s.description)}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</div>
        </div>
        <div className={clsx(s.item)}>
          <div className={clsx(s.label)}>Working Hours</div>
          <div className={clsx(s.description)}>24 hours a day</div>
        </div>
      </div>
      <div className={clsx(s.map)}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.0498078863807!2d37.6269986388016!3d55.71278444705659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b22a91ac945%3A0xf19f72681321ff46!2sIThub%20college!5e0!3m2!1sru!2sru!4v1707748668441!5m2!1sru!2sru"
          width="1360"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};
