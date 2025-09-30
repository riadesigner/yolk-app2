import { useNavigate } from 'react-router-dom';
import styles from './MainPageYoSliders.module.css';
import { getPayloads } from '../../../utils/payloads.jsx';

export default function MainPageYoSlider() {
  const savedUser = getPayloads();
  const userRole = savedUser ? savedUser.role : 'unknown';

  const navigate = useNavigate();

  const navTo = {
    company: '/cp/company',
    designer: '/cp/designer',
    administrator: '/cp/yolk-admin',
    unknown: '/login',
  };

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <div className={styles.yoSlider}>
            <svg width="4" height="1.5" viewBox="0 0 4 1.5" />
            <div className={styles.yoSliderContainer}>
              <div
                className="p-6"
                onClick={() => {
                  navigate(navTo[userRole]);
                }}
              >
                <h1 className="title is-size-3">
                  Создай <br />
                  свой
                  <br /> профиль
                </h1>
                <span />
              </div>
              <div
                className="p-6"
                onClick={() => {
                  navigate('/designers');
                }}
              >
                <h1 className="title is-size-3">
                  Найди <br />
                  своего
                  <br /> дизайнера
                </h1>
                <span />
              </div>
              <div
                className="p-6"
                onClick={() => {
                  navigate('/orders');
                }}
              >
                <h1 className="title is-size-3">
                  Найди
                  <br />
                  свой
                  <br />
                  заказ
                </h1>
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mobile-only">
        <section className="container mb-5">
          <div className="section yo-main-tasks">
            <div
              className="block "
              onClick={() => {
                navigate(navTo[userRole]);
              }}
            >
              <h1 className="title is-size-5">Создай свой профиль</h1>
              <i className="fa-solid fa-arrow-right" />
            </div>
            <div
              className="block "
              onClick={() => {
                navigate('/designers');
              }}
            >
              <h1 className="title is-size-5">Заполни свое портфолио</h1>
              <i className="fa-solid fa-arrow-right" />
            </div>
            <div
              className="block "
              onClick={() => {
                navigate('/orders');
              }}
            >
              <h1 className="title is-size-5">Найди свой заказ</h1>
              <i className="fa-solid fa-arrow-right" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
