import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './OrderPreview.module.css';

export default function OrderPreview({ order }) {
  const companyId = order.company?.id || null;
  const companyName = order.company?.name || 'не указано';
  const dateTo = order.dateTo ? order.dateTo.split('T')[0] : '';

  // console.log('order', order);

  return (
    <div className={styles.order}>
      <Link to={`/orders/${order.id}`}>
        <h2 className="subtitle is-size-6">{order.title || ''}</h2>
        <p>
          {order.price || 0}
          &nbsp;
          <i
            className="fa-solid fa-ruble-sign is-size-6 is-primary"
            style={{ opacity: 0.6 }}
          ></i>
        </p>
      </Link>
      <hr />
      <div className={styles.company}>
        <span>
          <a href={`/companies/${companyId}`}>{companyName}</a>
        </span>
        <div className="level mt-4">
          <div className="level-item ">
            <span className="is-size-7">
              <i className="fa-solid fa-eye is-primary"></i> 2
            </span>
          </div>
          <div className="level-item is-right is-size-7">
            <span style={{ opacity: 0.4 }}>
              <i className="fa-regular fa-calendar-days"></i>
            </span>
            <span>{dateTo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderPreview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateTo: PropTypes.string,
    company: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  }).isRequired,
};
