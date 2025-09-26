import { useParams } from 'react-router-dom';

import styles from './OrdersPage.module.css';
import OrderPreview from './components/OrderPreview.jsx';
import OrdersFilter from './components/OrdersFilter.jsx';
import Pagination from '../../components/Pagination.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';

import useFetchOrders from '../../hooks/useFetchOrders.js';
import useFetchCategories from '../../hooks/useFetchCategories.js';

export default function PortfolioPage() {
  const params = useParams();
  const { userInput, categoryId } = params;

  const { userCategories, setUserCategories } = useFetchCategories({
    categoryId,
  });

  const { orders, currentPage, setCurrentPage, paginationParams } =
    useFetchOrders({ userInput, userCategories });

  const links = userInput
    ? [
        { link: '/', title: 'Главная' },
        { link: '/orders', title: 'Все заказы' },
        { link: '#', title: userInput, isActive: true },
      ]
    : [
        { link: '/', title: 'Главная' },
        // {link:'#', title:'Все заказы', isActive:true},
        {
          link: '#',
          title: `Найдено заказов: ${paginationParams.totalItems}`,
          isActive: true,
        },
      ];

  return (
    <>
      <section className="container desktop-only is-max-desktop">
        <div className="section">
          <Breadcrumb links={links} />
        </div>
      </section>

      <section className="container is-max-desktop">
        <div className="section">
          <article>
            <div className={styles.ordersPage}>
              <div>
                <OrdersFilter
                  userCategories={userCategories}
                  setUserCategories={setUserCategories}
                />
              </div>
              {orders && orders.length > 0 ? (
                <div className="block">
                  <div className={styles.orders}>
                    {orders.length > 0 &&
                      orders.map((order) => {
                        // console.log('order= ', order);
                        return <OrderPreview key={order.id} order={order} />;
                      })}
                  </div>
                  <div className="block mt-6">
                    <Pagination
                      paginationParams={paginationParams}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="block">
                  <h3>Не найдены заказы</h3>
                  <p>
                    Попробуйте <a href="/orders">менее строгий поиск</a>
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
