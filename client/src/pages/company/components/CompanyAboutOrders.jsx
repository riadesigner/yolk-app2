import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CompanyAboutOrders({ orders }) {
  return (
    <>
      <h2>Размещенные заказы</h2>
      <div>
        {orders.map((order, index) => {
          return (
            <div className="mb-3 " key={order.id || index}>
              Заказ{' '}
              <span
                style={{
                  color: 'var(--primary-color)',
                }}
              >
                (актуальный)
              </span>
              : <Link to={`/orders/${order.id}`}>{order.title}</Link>
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </>
  );
}

CompanyAboutOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string,
    })
  ),
};
