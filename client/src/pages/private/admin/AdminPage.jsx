import { Link } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';

import useFetchAdmin from '../../../hooks/useFetchAdmin.jsx';

export default function DesignerAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, notifications, nowLoading } = useFetchAdmin();

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
                Добро, пожаловать Администратор{' '}
                <nobr>{user && user.name}!</nobr>
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
                <h2 className="is-size-5-mobile">Резюме</h2>
                <div className="block">
                  <Link to="/cp/yolk-admin/info">
                    <button className="button is-fluid is-medium is-regular-mobile is-link mb-3">
                      <span>Сводная таблица</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                  <Link to="/cp/yolk-admin/orders">
                    <button className="button is-fluid is-medium is-regular-mobile mb-3 is-link ">
                      <span>Все заказы</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                  <Link to="/cp/yolk-admin/bills">
                    <button className="button is-fluid is-medium is-regular-mobile is-link ">
                      <span>Все счета</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                </div>

                <h2 className="is-size-5-mobile">Пользователи</h2>
                <div className="block">
                  <Link to="/cp/yolk-admin/designers">
                    <button className="button is-fluid is-medium is-regular-mobile is-primary mb-3">
                      <span>Дизайнеры</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                  <Link to="/cp/yolk-admin/companies">
                    <button className="button is-fluid is-medium is-regular-mobile is-primary">
                      <span>Компании</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              <NotifsLast
                linkToAll="/cp/yolk-admin/notifs"
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
