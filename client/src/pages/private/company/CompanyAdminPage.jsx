import { Link, useNavigate } from 'react-router-dom';

import { formatDate } from '../../../utils/dateUtilits.jsx';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';

import useFetchCompanyAdmin from '../../../hooks/useFetchCompanyAdmin.js';
import ChatsList from '../../../components/ChatsList.jsx';

export default function CompanyAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, orders, company, notifications, nowLoading } =
    useFetchCompanyAdmin();

  const navigate = useNavigate();

  const hdlOpenOrder = (e, orderId) => {
    e.preventDefault();
    navigate(`/cp/company/${company ? company.id : ''}/order-edit/${orderId}`);
  };

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
                  <h2 className="is-size-5-mobile">Информация</h2>
                  <Link to="/cp/company/info">
                    <button className="button is-fluid is-medium is-regular-mobile is-link mb-3">
                      <span>О компании</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>

                  <Link to="/cp/company/card">
                    <button className="button  is-fluid is-medium is-regular-mobile is-link mb-3">
                      <span>Реквизиты</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>

                  <Link to="/cp/company/bills">
                    <button className="button  is-fluid is-medium is-regular-mobile is-link ">
                      <span>Счета</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </button>
                  </Link>
                </div>

                <div className="block">
                  <h2 className="is-size-5-mobile">Чаты</h2>
                  <Link
                    to={`/cp/chats`}
                    className="button is-fluid is-medium is-regular-mobile is-white mb-4"
                  >
                    <span>Мои чаты</span>
                    <span className="icon">
                      <i className="fa fa-angle-right" />
                    </span>
                  </Link>
                  {user?.chats && (
                    <ChatsList chats={user?.chats?.slice(0, 4) ?? []} />
                  )}
                </div>

                <div className="block">
                  <h2 className="is-size-5-mobile">Заказы</h2>
                  {company && orders.length < 20 && (
                    <Link
                      as={<button />}
                      className="button is-fluid is-medium is-regular-mobile is-white mb-3 "
                      to={`/cp/company/${company ? company.id : ''}/order-new`}
                    >
                      <span>Создать новый</span>
                      <span className="icon">
                        <i className="fa fa-angle-right" />
                      </span>
                    </Link>
                  )}
                  {orders &&
                    orders.length > 0 &&
                    orders.map((order) => {
                      return (
                        <button
                          key={order.id}
                          className="button is-fluid is-medium is-regular-mobile is-primary mb-3 is-left"
                          onClick={(e) => hdlOpenOrder(e, order.id)}
                        >
                          {order.contractor && (
                            <span>
                              <i className="fa-regular fa-user" />
                            </span>
                          )}
                          <span>
                            {order.title}
                            <br />
                            <span className="is-size-7">[ {order.id} ]</span>
                          </span>
                        </button>
                      );
                    })}
                </div>

                <div className="block">
                  <h2 className="is-size-5-mobile">Статистика</h2>
                  <p className="subtitle is-size-7 m-0">Дата регистрации</p>
                  <p className="is-size-7">
                    {company ? formatDate(company.createdAt) : '-'}
                  </p>
                </div>
              </div>

              <NotifsLast
                linkToAll="/cp/company/notifs"
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
