import styles from './CompanyPreview.module.css';
import PropTypes from 'prop-types';

export default function CompanyPreview({ company }) {
  return (
    <a href={`/companies/${company.id}`}>
      <div id={company.id} className={styles.preview}>
        <h2 className="title is-size-5">{company.name}</h2>
      </div>
    </a>
  );
}

CompanyPreview.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
  }),
};
