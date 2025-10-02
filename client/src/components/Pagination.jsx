import styles from './Pagination.module.css';
import PropTypes from 'prop-types';

export default function Pagination({
  paginationParams,
  currentPage,
  setCurrentPage,
}) {
  const { totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
    paginationParams;

  const hdlClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className={styles.pageLinks}>
        {
          <>
            {hasPrevPage && (
              <a href={`#page=${prevPage}`} onClick={() => hdlClick(prevPage)}>
                Назад
              </a>
            )}
            <span>{`${currentPage} / ${totalPages || 1}`}</span>
            {hasNextPage && (
              <a href={`#page=${nextPage}`} onClick={() => hdlClick(nextPage)}>
                Вперед
              </a>
            )}
          </>
        }
      </div>
    </>
  );
}

Pagination.propTypes = {
  paginationParams: PropTypes.shape({
    totalPages: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPrevPage: PropTypes.bool,
    nextPage: PropTypes.number,
    prevPage: PropTypes.number,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
