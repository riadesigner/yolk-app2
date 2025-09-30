import { useRef, useState } from 'react';
import styles from '../components/PublicPortfolioItem.module.css';
import { Link, useParams } from 'react-router-dom';
import { getPayloads } from '../utils/payloads.jsx';
import PropTypes from 'prop-types';

export default function PublicPortfolioItem({
  id,
  images,
  title,
  forEdit,
  hdlDelete,
  hdlEdit,
}) {
  const { designerId } = useParams();
  const { id: plID } = getPayloads();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const deleteButtonRef = useRef(null);
  const editButtonRef = useRef(null);

  const hdlConfirmShowDelete = (e) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };
  const hdlConfirmHide = (e) => {
    e.stopPropagation();
    setShowConfirmDelete(false);
  };

  const desId = designerId ?? plID;

  let imageToShow = ['', '', '', ''];
  imageToShow = imageToShow.map((im, i) => {
    return images[i] ? images[i] : im;
  });

  return (
    <div className="box p-5">
      <div className={styles.portItem}>
        <Link
          className={styles.portItemWrapper}
          to={`/designers/${desId}/portfolio/${id}`}
        >
          <div className={styles.imagesBlock}>
            {imageToShow &&
              imageToShow.map((im, i) => {
                return im ? (
                  <span
                    key={im.key}
                    style={{
                      background: `url(${im.url}) no-repeat center/100%`,
                    }}
                  ></span>
                ) : (
                  <span key={i}></span>
                );
              })}
          </div>
          <h1 className="title is-size-5 is-size-6-mobile mb-0 mt-3">
            {title}
          </h1>
        </Link>
        {forEdit && (
          <div className="level mt-3">
            <div className="level-item">
              <button
                ref={deleteButtonRef}
                onClick={(e) => hdlConfirmShowDelete(e)}
                className="button is-small"
              >
                X
              </button>
            </div>
            <div className="level-item is-right">
              <button
                ref={editButtonRef}
                className="button is-primary is-small"
                onClick={(e) => hdlEdit(e, id)}
              >
                Редактировать
              </button>
            </div>
          </div>
        )}
        {showConfirmDelete && (
          <div className={styles.confirmWindow}>
            <div className="has-text-centered">
              <h2 className="title">Действительно удалить?</h2>
              <button
                className="button mr-5 is-primary"
                onClick={(e) => hdlConfirmHide(e)}
              >
                Отмена
              </button>
              <button
                className="button is-danger"
                onClick={(e) => hdlDelete(e, id)}
              >
                Да, удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PublicPortfolioItem.propTypes = {
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  forEdit: PropTypes.bool,
  hdlDelete: PropTypes.func,
  hdlEdit: PropTypes.func,
};
