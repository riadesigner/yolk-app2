import PropTypes from 'prop-types';
import styles from './AdminDesignerPreview.module.css';
import { Link } from 'react-router-dom';

export default function AdminCompanyPreview({ designer }) {
  return (
    <Link to={`/designers/${designer.id}`} className={styles.designerPreview}>
      <span>{designer.name}</span>
      <span>{designer.email}</span>
      <span>{designer.specialization}</span>
      <span>Выполнил заказов: {designer.ordersAmount}</span>
    </Link>
  );
}

AdminCompanyPreview.propTypes = {
  designer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    ordersAmount: PropTypes.number.isRequired,
  }).isRequired,
};
