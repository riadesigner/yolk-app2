import styles from './CompanyGallery.module.css';
import PropTypes from 'prop-types';

export default function CompanyGallery({ gallery }) {
  return (
    <div className={styles.gallery}>
      {gallery &&
        gallery.map((img, index) => {
          return (
            <a
              key={img.key || index}
              href={img.url}
              target="_blank"
              rel="noreferrer"
            >
              <div
                style={{
                  background: `url(${img.url}) no-repeat center / cover`,
                }}
              ></div>
            </a>
          );
        })}
    </div>
  );
}

CompanyGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      url: PropTypes.string,
    })
  ),
};
