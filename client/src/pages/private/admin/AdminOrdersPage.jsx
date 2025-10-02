import styles from './AdminOrdersPage.module.css';

import AdminOrdersFilter from './components/AdminOrdersFilter.jsx';
import Pagination from '../../../components/Pagination.jsx';
import AdminOrderPreview from './components/AdminOrderPreview.jsx';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import { useFetchAdminOrders } from '../../../hooks/useFetchAdminOrders.js';
import { useMemo, useState } from 'react';
// import CompanyGallery from '../../components/CompanyGallery';
// import CompanyAboutHeader from '../../components/CompanyAboutHeader';
// import CompanyAboutOrders from '../../components/CompanyAboutOrders';
// import TextWithBreaks from '../../components/TextWithBreaks';

export default function CompanyInfoPage() {
  const [stateFilter, setStateFilter] = useState('PUBLISHED');

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/yolk-admin', title: 'Панель управления' },
    { link: '#', title: 'Все заказы', isActive: true },
  ];

  const { orders, updateAdminBill } = useFetchAdminOrders();

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === stateFilter),
    [orders, stateFilter]
  );

  const ordersCount = useMemo(
    () =>
      orders.reduce(
        (acc, order) => ({
          ...acc,
          [order.status]: (acc[order.status] ?? 0) + 1,
        }),
        {}
      ),
    [orders]
  );

  return (
    <>
      <section className="container is-max-desktop desktop-only">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>
      <article>
        <section className="container is-max-desktop">
          <div className="section">
            <article>
              <div className={styles.ordersPage}>
                <div>
                  <AdminOrdersFilter
                    setFilter={setStateFilter}
                    currentFilter={stateFilter}
                    ordersCount={ordersCount}
                  />
                </div>
                <div className="block">
                  <div className={styles.orders}>
                    {filteredOrders &&
                      filteredOrders.map((ord) => {
                        return (
                          <AdminOrderPreview
                            order={ord}
                            key={ord.title}
                            updateOrder={updateAdminBill}
                          />
                        );
                      })}
                  </div>
                  <div className="block mt-6">
                    <Pagination
                      currentPage={1}
                      paginationParams={{}}
                      setCurrentPage={() => {}}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </article>
    </>
  );
}
