import { Link } from 'react-router-dom';

import useFetchDesignerAdmin from '../../../hooks/useFetchDesignerAdmin.js';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';

export default function DesignerAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, notifications, nowLoading } = useFetchDesignerAdmin();

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <section className="container">
        <div className="section mt-0">
          <div className="banner is-primary">
            <div className="banner-body">
              <h1 className="sub-title is-size-5-mobile mb-0">
                Добро, пожаловать <nobr>{user && user.name}!</nobr>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section">
          <article>
            <div className="columns">
              <div className="column is-6">
                <div className="block">
                  <h2 className="is-size-5-mobile">Резюме</h2>
                  <Link to="/cp/designer/info">
                    <button className="button is-fluid is-medium is-regular-mobile is-link mb-3">
                      <span>Анкета</span>
                      <span className="icon">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </button>
                  </Link>

                  <Link to="/cp/designer/portfolio">
                    <button className="button  is-fluid is-medium is-regular-mobile is-link ">
                      <span>Портфолио</span>
                      <span className="icon">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </button>
                  </Link>
                </div>

                <h2 className="is-size-5-mobile">Заказы</h2>
                <div className="block mb-6 mb-5-mobile">
                  <button className="button disabled is-fluid is-medium is-regular-mobile is-white">
                    <span>Мои заказы</span>
                    <span className="icon">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </button>
                </div>
                <h2 className="is-size-5-mobile">Мой статус</h2>
                <div className="block mb-6 mb-5-mobile">
                  <div className="stars-block">
                    <div className="stars-block-label">Новенький</div>
                    <div className="stars-block-items">
                      <span className="is-active"></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>

              <NotifsLast
                linkToAll="/cp/designer/notifs"
                notifications={notifications}
                nowLoading={nowLoading}
              />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
