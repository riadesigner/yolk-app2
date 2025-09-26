import PropTypes from 'prop-types';
import styles from './AdminOrderPreview.module.css';

export default function AdminOrderPreview({ order }) {
  return (
    <div className={styles.order}>
      <span className="is-size-7">{order.title}</span>
      <span>{order.company}</span>
      <span>{order.price}</span>
    </div>
  );
}

AdminOrderPreview.propTypes = {
  order: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};
