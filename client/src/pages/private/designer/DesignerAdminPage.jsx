import { Link } from 'react-router-dom';

import useFetchDesignerAdmin from '../../../hooks/useFetchDesignerAdmin.js';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';
import DesignerOrderItem from './components/DesignerOrderItem.jsx';
import ChatsList from '../../../components/ChatsList.jsx';

const expLevels = [
  {
    title: 'Новичок',
    exp: '0',
  },
  {
    title: 'Трудяга',
    exp: '21',
  },
  {
    title: 'Умелец',
    exp: '41',
  },
  {
    title: 'Профи',
    exp: '81',
  },
];

export default function DesignerAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, notifications, nowLoading } = useFetchDesignerAdmin();

  const expLevel =
    expLevels.findLast(
      (level) => (user?.userInfo?.experience ?? 0) >= level.exp
    ) ?? expLevels[0];

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
                  <Link
                    to={'/cp/designer/info'}
                    as={<button />}
                    className="button is-fluid is-medium is-regular-mobile is-link mb-3"
                  >
                    <span>Анкета</span>
                    <span className="icon">
                      <i className="fa fa-angle-right" />
                    </span>
                  </Link>

                  <Link
                    to="/cp/designer/portfolio"
                    as={<button />}
                    className="button is-fluid is-medium is-regular-mobile is-link"
                  >
                    <span>Портфолио</span>
                    <span className="icon">
                      <i className="fa fa-angle-right" />
                    </span>
                  </Link>
                </div>

                <h2 className="is-size-5-mobile">Заказы</h2>
                <div className="block mb-6 mb-5-mobile">
                  <Link
                    to={`/cp/designer/orders`}
                    className="button is-fluid is-medium is-regular-mobile is-white mb-4"
                  >
                    <span>Мои заказы</span>
                    <span className="icon">
                      <i className="fa fa-angle-right" />
                    </span>
                  </Link>
                  {user?.contracts &&
                    user?.contracts?.length > 0 &&
                    // user?.contracts?.map(
                    user?.contracts?.slice(0, 4).map((order) => {
                      return (
                        <DesignerOrderItem
                          key={order.id}
                          orderId={order.id}
                          title={order.title}
                          clientName="mb-4"
                        />
                      );
                    })}
                </div>

                <div>
                  <h2 className="is-size-5-mobile">Мои чаты</h2>
                  <div className="block mb-6 mb-5-mobile">
                    <Link
                      to={`/cp/chats`}
                      className="button is-fluid is-medium is-regular-mobile is-white mb-4"
                    >
                      <span>Мои чаты</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </Link>
                    <ChatsList chats={user?.chats?.slice(0, 4) ?? []} />
                  </div>
                </div>

                <h2 className="is-size-5-mobile">Мой статус</h2>
                <div className="block mb-6 mb-5-mobile">
                  <div className="stars-block">
                    <div className="stars-block-label">{expLevel.title}</div>
                    <div className="stars-block-items">
                      {expLevels.map((level) => (
                        <span
                          key={level.exp}
                          className={
                            (user?.userInfo?.experience ?? 0) >= level.exp
                              ? 'is-active'
                              : ''
                          }
                        />
                      ))}
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
