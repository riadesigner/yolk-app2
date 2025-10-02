import PropTypes from 'prop-types';
import styles from './AdminOrderPreview.module.css';

export default function AdminOrderPreview({ order, updateOrder }) {
  const hdlUpdateBill = () => {
    const billId = order.bills?.find(
      (bill) => bill.direction === 'FROM_YOLK'
    ).id;
    if (!billId) {
      console.error('Счет не найден');
      return;
    }
    if (confirm('Перевести в статус оплачен?')) {
      updateOrder(billId);
    }
  };

  return (
    <div className={styles.order}>
      <span className="is-size-7">{order.title}</span>
      <span>{order.company.name}</span>
      <span>{order.price.toLocaleString()}</span>
      {order.status === 'HAS_CONTRACTOR' && (
        <button onClick={hdlUpdateBill} className="button is-primary">
          Оплачен
        </button>
      )}
    </div>
  );
}

AdminOrderPreview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        direction: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  updateOrder: PropTypes.func.isRequired,
};
