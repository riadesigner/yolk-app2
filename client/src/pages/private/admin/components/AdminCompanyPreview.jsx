import PropTypes from 'prop-types';
import styles from './AdminCompanyPreview.module.css';

export default function AdminCompanyPreview({ company }) {
  return (
    <div className={styles.companyPreview}>
      <span>{company.name}</span>
      <span>{company.city}</span>
      <span>{company.specialization}</span>
      <span>Заказов всего: {company.ordersAmount}</span>
    </div>
  );
}
AdminCompanyPreview.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    ordersAmount: PropTypes.number.isRequired,
  }).isRequired,
};
