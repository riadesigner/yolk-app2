import PropTypes from 'prop-types';
import styles from './AdminCompanyPreview.module.css';
import { Link } from 'react-router-dom';

export default function AdminCompanyPreview({ company }) {
  return (
    <Link to={`/companies/${company.id}`} className={styles.companyPreview}>
      <span>{company.name}</span>
      <span>{company.companyName}</span>
      <span>{company.city}</span>
      <span>Заказов всего: {company.ordersAmount}</span>
    </Link>
  );
}
AdminCompanyPreview.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    ordersAmount: PropTypes.number.isRequired,
  }).isRequired,
};
