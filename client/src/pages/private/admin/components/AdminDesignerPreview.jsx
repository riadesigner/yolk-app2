import PropTypes from 'prop-types';
import styles from './AdminDesignerPreview.module.css';

export default function AdminCompanyPreview({ designer }) {
  return (
    <div className={styles.designerPreview}>
      <span>{designer.name}</span>
      <span>{designer.city}</span>
      <span>{designer.specialization}</span>
      <span>Выполнил заказов: {designer.ordersAmount}</span>
    </div>
  );
}

AdminCompanyPreview.propTypes = {
  designer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    ordersAmount: PropTypes.number.isRequired,
  }).isRequired,
};
